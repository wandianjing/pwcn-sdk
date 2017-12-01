'use strict';

Pwcn.DEFAULT_HOST = 'localhost';
Pwcn.DEFAULT_PORT = '3090';
Pwcn.DEFAULT_BASE_PATH = '/v1/';
Pwcn.DEFAULT_API_VERSION = null;

Pwcn.DEFAULT_TIMEOUT = require('http').createServer().timeout;

Pwcn.PACKAGE_VERSION = "0.1.0";

Pwcn.USER_AGENT = {
  bindings_version: Pwcn.PACKAGE_VERSION,
  lang: 'node',
  lang_version: process.version,
  platform: process.platform,
  publisher: 'matonghe',
  uname: null
};

Pwcn.USER_AGENT_SERIALIZED = null;

var exec = require('child_process').exec;

var resources = {
  Charges: require('./resources/Charges'),
  // ChargeRefunds: require('./resources/ChargeRefunds'),
  // RedEnvelopes: require('./resources/RedEnvelopes'),
  // Events: require('./resources/Events'),
  // Transfers: require('./resources/Transfers'),
  // BatchTransfers: require('./resources/BatchTransfers'),
  // Identification: require('./resources/Identification'),
  // Customs: require('./resources/Customs'),
  // AssetTransactions: require('./resources/AssetTransactions'),
  // BatchRefunds: require('./resources/BatchRefunds'),
  // CouponTemplates: require('./resources/CouponTemplates'),
  // Users: require('./resources/Users'),
  // Orders: require('./resources/Orders'),
  // Recharge: require('./resources/Recharge'),
  // Coupons: require('./resources/Coupons'),
  // BalanceTransactions: require('./resources/BalanceTransactions'),
  // Withdrawals: require('./resources/Withdrawals'),
  // BatchWithdrawals: require('./resources/BatchWithdrawals'),
  // TransactionStatistics: require('./resources/TransactionStatistics'),
  // Balance: require('./resources/Balance'),
  // SubApps: require('./resources/SubApps'),
  // SettleAccounts: require('./resources/SettleAccounts'),
  // Royalties: require('./resources/Royalties'),
  // RoyaltySettlements: require('./resources/RoyaltySettlements'),
  // RoyaltyTransactions: require('./resources/RoyaltyTransactions'),
};

var wxPubOauth = require('./WxPubOauth');
var _ = require('lodash');
var HEADERS_TO_PARSE = ['Pwcn-One-Version', 'Pwcn-Sdk-Version'];
var fs = require('fs');

Pwcn.PwcnResource = require('./PwcnResource');
Pwcn.resources = resources;
Pwcn.wxPubOauth = wxPubOauth;

function Pwcn(key, version) {
  if (!(this instanceof Pwcn)) {
    return new Pwcn(key, version);
  }

  this._api = {
    auth: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MDk0MjE5MjcsImlhdCI6MTUwOTMzNTUyNywic3ViIjoiNTlmNmExOGRmZDkzMzkwODFkZjM4ODUyLmppYmMtbTQxbHBqOWRuZDY1ZCJ9.zoJ7865QWesugPn-XrGBIp9xSpHYyb-nm3vJPO518u0',
    host: Pwcn.DEFAULT_HOST,
    port: Pwcn.DEFAULT_PORT,
    basePath: Pwcn.DEFAULT_BASE_PATH,
    version: Pwcn.DEFAULT_API_VERSION,
    timeout: Pwcn.DEFAULT_TIMEOUT,
    protocol:'http',
    dev: false
  };

  this._parsedHeaders = {};
  this._privateKey = null;

  this._prepResources();
  this._prepExtraFuncs();
  this.setApiKey(key);
  this.setApiVersion(version);
}

Pwcn.prototype = {

  setHost: function(host, port, protocol) {
    this._setApiField('host', host);
    if (port) this.setPort(port);
    if (protocol) this.setProtocol(protocol);
  },

  setProtocol: function(protocol) {
    this._setApiField('protocol', protocol.toLowerCase());
  },

  setPort: function(port) {
    this._setApiField('port', port);
  },

  setApiVersion: function(version) {
    if (version) {
      this._setApiField('version', version);
    }
  },

  setApiKey: function(key) {
    if (key) {
      this._setApiField(
        'authorization',
        'Bearer ' + new Buffer(key + ':').toString('base64')
      );
    }
  },

  setAppID: function(id) {
    if (id) {
      this._setApiField(
        'appID',
         id
      );
    }
  },

  setTimeout: function(timeout) {
    this._setApiField(
      'timeout',
      timeout == null ? Pwcn.DEFAULT_TIMEOUT : timeout
    );
  },

  _setApiField: function(key, value) {
    this._api[key] = value;
  },

  getApiField: function(key) {
    return this._api[key];
  },

  getConstant: function(c) {
    return Pwcn[c];
  },

  getClientUserAgent: function(cb) {
    if (Pwcn.USER_AGENT_SERIALIZED) {
      return cb(Pwcn.USER_AGENT_SERIALIZED);
    }
    exec('uname -a', function(err, uname) {
      Pwcn.USER_AGENT.uname = uname || 'UNKNOWN';
      Pwcn.USER_AGENT_SERIALIZED = JSON.stringify(Pwcn.USER_AGENT);
      cb(Pwcn.USER_AGENT_SERIALIZED);
    });
  },

  setPrivateKey: function(privateKey) {
    this._privateKey = privateKey;
  },

  getPrivateKey: function() {
    return this._privateKey;
  },

  setPrivateKeyPath: function(path) {
    this._privateKey = fs.readFileSync(path, 'utf8');
  },

  _prepResources: function() {

    for (var name in resources) {
      this[
        name[0].toLowerCase() + name.substring(1)
      ] = new resources[name](this);
    }
  },

  _setParsedHeader: function(key, value) {
    this._parsedHeaders[key] = value;
  },

  getParsedHeaders: function() {
    return this._parsedHeaders;
  },

  _prepExtraFuncs: function() {
    var self = this;
    this['wxPubOauth'] = wxPubOauth;
    this['parseHeaders'] = function (headers){
      if (typeof headers == 'undefined') {
        return;
      }
      for (var k in headers) {
        var key = _.startCase(k.toLowerCase()).replace(/\s/g, '-');
        if (_.indexOf(HEADERS_TO_PARSE, key) != -1) {
          self._setParsedHeader(key, headers[k]);
        }
      }
    };
  }
};

module.exports = Pwcn;
