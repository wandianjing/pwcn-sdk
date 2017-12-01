'use strict';

var http = require('http');
var https = require('https');
var path = require('path');
var when = require('when');
var _ = require('lodash');

var utils = require('./utils');
var Error = require('./Error');

var hasOwn = {}.hasOwnProperty;

// Provide extension mechanism for Pwcn Resource Sub-Classes
PwcnResource.extend = utils.protoExtend;

// Expose method-creator & prepared (basic) methods
PwcnResource.method = require('./PwcnMethod');
PwcnResource.BASIC_METHODS = require('./PwcnMethod.basic');

/**
 * Encapsulates request logic for a Pwcn Resource
 */
function PwcnResource(pwcn, urlData) {
  this._pwcn = pwcn;
  this._urlData = urlData || {};

  this.basePath = utils.makeURLInterpolator(pwcn.getApiField('basePath'));
  this.path = utils.makeURLInterpolator(this.path);

  if (this.includeBasic) {
    this.includeBasic.forEach(function(methodName) {
      this[methodName] = PwcnResource.BASIC_METHODS[methodName];
    }, this);
  }

  this.initialize.apply(this, arguments);
}

PwcnResource.prototype = {
  path: '',

  initialize: function() {},

  createFullPath: function(commandPath, urlData) {
    return path.join(
      this.basePath(urlData),
      this.path(urlData),
      typeof commandPath == 'function' ?
        commandPath(urlData) : commandPath
    ).replace(/\\/g, '/'); // ugly workaround for Windows
  },

  createUrlData: function(callback) {
    var urlData = {};
    for (var i in this._urlData) {
      if (hasOwn.call(this._urlData, i)) {
        urlData[i] = this._urlData[i];
      }
    }

    return urlData;
  },

  createDeferred: function(callback) {
    var deferred = when.defer();

    if (callback) {
      // Callback, if provided, is a simply translated to Promise'esque:
      // (Ensure callback is called outside of promise stack)
      deferred.promise.then(function(res) {
        setTimeout(function(){ callback(null, res); }, 0);
      }, function(err) {
        setTimeout(function(){ callback(err, null); }, 0);
      });
    }

    return deferred;
  },

  _timeoutHandler: function(timeout, req, callback) {
    var self = this;
    return function() {
      var timeoutErr = new Error('ETIMEOUT');
      timeoutErr.code = 'ETIMEOUT';

      req._isAborted = true;
      req.abort();

      callback.call(
        self,
        new Error.PwcnConnectionError({
          message: 'Request aborted due to timeout being reached (' + timeout + 'ms)',
          detail: timeoutErr
        }),
        null
      );
    };
  },

  _responseHandler: function(req, callback) {
    var self = this;
    return function(res) {
      var response = '';

      res.setEncoding('utf8');
      res.on('data', function(chunk) {
        response += chunk;
      });
      res.on('end', function() {
        try {
          response = JSON.parse(response);
          if (response.error) {
            var err;
            if (res.statusCode === 401) {
              err = new Error.PwcnAuthenticationError(response.error);
            } else {
              err = Error.PwcnError.generate(response.error);
            }
            return callback.call(self, err, null);
          }
        } catch (e) {
          return callback.call(
            self,
            new Error.PwcnAPIError({
              message: 'Invalid JSON received from the Pwcn API',
              response: response,
              exception: e
            }),
            null
          );
        }
        callback.call(self, null, response);
      });
    };
  },

  _errorHandler: function(req, callback) {
    var self = this;
    return function(error) {
      if (req._isAborted) return; // already handled
      callback.call(
        self,
        new Error.PwcnConnectionError({
          message: 'An error occurred with our connection to Pwcn',
          detail: error.message
        }),
        null
      );
    };
  },

  _request: function(method, path, data, auth, callback) {
    var requestData = '';
    var contentType = 'application/json';
    switch (method) {
    case 'POST':
    case 'PUT':
      requestData = JSON.stringify(data || {});
      break;
    case 'GET':
    case 'DELETE':
      contentType = 'application/x-www-form-urlencoded';
      path = data ? (path + '?' + utils.stringifyRequestData(data)) : path;
      break;
    default:
    }
    var self = this;

    var apiVersion = this._pwcn.getApiField('version');
    var headers = {
      'Authorization': 'Bearer ' + auth,
      'Accept': 'application/json',
      'Content-Type': contentType + '; charset=UTF-8',
      'User-Agent': 'Pwcn/v1 NodeBindings/'
        + this._pwcn.getConstant('PACKAGE_VERSION')
    };

    var requestTime = Date.parse(new Date()) / 1000;
    if (this._pwcn.getPrivateKey()) {
      headers['Pingplusplus-Signature'] = utils.generateSign(
        requestData + path + requestTime,
        this._pwcn.getPrivateKey()
      );
    }
    headers['Pingplusplus-Request-Timestamp']= requestTime;

    if (apiVersion) {
      headers['Pingplusplus-Version'] = apiVersion;
    }

    headers = _.assign(headers, this._pwcn.getParsedHeaders());

    this._pwcn.getClientUserAgent(function(cua) {
      // headers['X-Pwcn-Client-User-Agent'] = cuaua;
      makeRequest();
    });

    function makeRequest() {
      var timeout = self._pwcn.getApiField('timeout');
      var isInsecureConnection = self._pwcn.getApiField('protocol') == 'http';
      var req = (
        isInsecureConnection ? http : https
      ).request({
        host: self._pwcn.getApiField('host'),
        port: self._pwcn.getApiField('port'),
        path: path,
        method: method,
        headers: headers,
        ciphers: 'DEFAULT:!aNULL:!eNULL:!LOW:!EXPORT:!SSLv2:!MD5',
        secureProtocol: 'TLSv1_method'
      });
        req._isAborted = true;

      req.setTimeout(timeout, self._timeoutHandler(timeout, req, callback));
      req.on('response', self._responseHandler(req, callback));
      req.on('error', self._errorHandler(req, callback));
      req.on('socket', function(socket) {
        socket.on(
          isInsecureConnection ? 'connect' : 'secureConnect',
          function() {
            req.write(requestData);
            req.end();
          }
        );
      });
    }
  }
};

module.exports = PwcnResource;
