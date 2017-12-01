'use strict';

var PwcnResource = require('../PwcnResource');
var pwcnMethod = PwcnResource.method;

module.exports = PwcnResource.extend({

  path: 'apps/{appId}',

  createTransfer: pwcnMethod({
    method: 'POST',
    path: '/transfers',
    urlParams: ['appId']
  }),

  createReceipts: pwcnMethod({
    method: 'POST',
    path: '/receipts',
    urlParams: ['appId']
  }),

});
