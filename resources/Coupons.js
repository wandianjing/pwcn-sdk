'use strict';

var PwcnResource = require('../PwcnResource');
var pwcnMethod = PwcnResource.method;

module.exports = PwcnResource.extend({

  path: 'apps/{appId}/users',

  create: pwcnMethod({
    method: 'POST',
    path: '/{userId}/coupons',
    urlParams: ['appId','userId']
  }),

  list: pwcnMethod({
    method: 'GET',
    path: '/{userId}/coupons',
    urlParams: ['appId','userId']
  }),

  retrieve: pwcnMethod({
    method: 'GET',
    path: '/{userId}/coupons/{couponsId}',
    urlParams: ['appId',"userId","couponsId"]
  }),

  update: pwcnMethod({
    method: 'PUT',
    path: '/{userId}/coupons/{couponsId}',
    urlParams: ['appId',"userId","couponsId"]
  }),
  
  delete: pwcnMethod({
    method: 'DELETE',
    path: '/{userId}/coupons/{couponsId}',
    urlParams: ['appId',"userId","couponsId"]
  }),

});
