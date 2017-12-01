'use strict';

var PwcnResource = require('../PwcnResource');
var pwcnMethod = PwcnResource.method;

module.exports = PwcnResource.extend({
  path: 'apps/{appId}/balance_transactions',

  list: pwcnMethod({
    method: 'GET',
    urlParams: ['appId']
  }),

  retrieve: pwcnMethod({
    method: 'GET',
    path: '/{txnId}',
    urlParams: ['appId', 'txnId']
  }),
});
