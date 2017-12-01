'use strict';

var PwcnResource = require('../PwcnResource');
var pwcnMethod = PwcnResource.method;

module.exports = PwcnResource.extend({

  path: 'apps/{appId}/users/{userId}/settle_accounts',

  create: pwcnMethod({
    method: 'POST',
    urlParams: ['appId', 'userId']
  }),

  list: pwcnMethod({
    method: 'GET',
    urlParams: ['appId', 'userId']
  }),

  retrieve: pwcnMethod({
    method: 'GET',
    path: '/{settleAccountId}',
    urlParams: ['appId', 'userId', 'settleAccountId']
  }),

  delete: pwcnMethod({
    method: 'DELETE',
    path: '/{settleAccountId}',
    urlParams: ['appId', 'userId', 'settleAccountId']
  }),

});
