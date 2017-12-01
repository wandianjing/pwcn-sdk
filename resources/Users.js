'use strict';

var PwcnResource = require('../PwcnResource');
var pwcnMethod = PwcnResource.method;

module.exports = PwcnResource.extend({

  path: 'apps/{appId}/users',

  create: pwcnMethod({
    method: 'POST',
    urlParams: ['appId']
  }),

  list: pwcnMethod({
    method: 'GET',
    urlParams: ['appId']
  }),

  retrieve: pwcnMethod({
    method: 'GET',
    path: '/{userId}',
    urlParams: ['appId', 'userId']
  }),

  update: pwcnMethod({
    method: 'PUT',
    path: '/{userId}',
    urlParams: ['appId', 'userId']
  }),

});
