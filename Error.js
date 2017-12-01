'use strict';

var utils = require('./utils');

module.exports = _Error;

/**
 * Generic Error klass to wrap any errors returned by pwcn-node
 */
function _Error(raw) {
  this.populate.apply(this, arguments);
  this.stack = (new Error(this.message)).stack;
}

// Extend Native Error
_Error.prototype = Object.create(Error.prototype);

_Error.prototype.type = 'GenericError';
_Error.prototype.populate = function(type, message) {
  this.type = type;
  this.message = message;
};

_Error.extend = utils.protoExtend;

/**
 * Create subclass of internal Error klass
 * (Specifically for errors returned from Pwcn's REST API)
 */
var PwcnError = _Error.PwcnError = _Error.extend({
  type: 'PwcnError',
  populate: function(raw) {
    // Move from prototype def (so it appears in stringified obj)
    this.type = this.type;

    this.stack = (new Error(raw.message)).stack;
    this.rawType = raw.type;
    this.code = raw.code;
    this.param = raw.param;
    this.message = raw.message;
    this.detail = raw.detail;
    this.raw = raw;
  }
});

/**
 * Helper factory which takes raw pwcn errors and outputs wrapping instances
 */
PwcnError.generate = function(rawPwcnError) {
  switch (rawPwcnError.type) {
    case 'invalid_request_error':
      return new _Error.PwcnInvalidRequestError(rawPwcnError);
    case 'api_error':
      return new _Error.PwcnAPIError(rawPwcnError);
    case 'channel_error':
      return new _Error.PwcnChannelError(rawPwcnError);
  }

  return new _Error('Generic', 'Unknown Error');
};

// Specific Pwcn Error types:
_Error.PwcnInvalidRequestError = PwcnError.extend({ type: 'PwcnInvalidRequest' });
_Error.PwcnAPIError = PwcnError.extend({ type: 'PwcnAPIError' });
_Error.PwcnAuthenticationError = PwcnError.extend({ type: 'PwcnAuthenticationError' });
_Error.PwcnConnectionError = PwcnError.extend({ type: 'PwcnConnectionError' });
_Error.PwcnChannelError = PwcnError.extend({ type: 'PwcnChannelError'});
