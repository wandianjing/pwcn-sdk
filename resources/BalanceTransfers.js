'use strict';

var PwcnResource = require('../PwcnResource');
var pwcnMethod = PwcnResource.method;

module.exports = PwcnResource.extend({

  path: 'apps/{appId}/users',

  create: pwcnMethod({
    method: 'POST',
    path: '/{userId}/transfers',
    urlParams: ['appId','userId']
  }),

});
