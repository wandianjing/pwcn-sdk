'use strict';

var PwcnResource = require('../PwcnResource');
var pwcnMethod = PwcnResource.method;

module.exports = PwcnResource.extend({

  path: 'apps/{appId}/batch_withdrawals',

  create: pwcnMethod({
    method: 'POST',
    path: '',
    urlParams: ['appId']
  }),

  retrieve: pwcnMethod({
    method: 'GET',
    path: '/{batchWithdrawalId}',
    urlParams: ['appId','batchWithdrawalId']
  }),

  list: pwcnMethod({
    method: 'GET',
    urlParams: ['appId']
  })

});
