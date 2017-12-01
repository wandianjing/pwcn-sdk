'use strict';

var PwcnResource = require('../PwcnResource');
var pwcnMethod = PwcnResource.method;

module.exports = PwcnResource.extend({

  path: 'apps/{appId}/transaction_statistics',

  list: pwcnMethod({
    method: 'GET',
    urlParams: ['appId']
  }),

});
