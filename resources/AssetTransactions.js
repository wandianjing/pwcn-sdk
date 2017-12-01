var PwcnResource = require('../PwcnResource');
var pwcnMethod = PwcnResource.method;

module.exports = PwcnResource.extend({

  path: 'apps/{appId}/asset_transactions',

  list: pwcnMethod({
    method: 'GET',
    urlParams: ['appId'],
  }),

  retrieve: pwcnMethod({
    method: 'GET',
    path: '/{Id}',
    urlParams: ['appId',"Id"],
  }),


});