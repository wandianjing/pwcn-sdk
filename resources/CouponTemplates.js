'use strict';

var PwcnResource = require('../PwcnResource');
var pwcnMethod = PwcnResource.method;

module.exports = PwcnResource.extend({

  path: 'apps/{appId}/coupon_templates',

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
    path: '/{Id}',
    urlParams: ['appId',"Id"]
  }),

  update: pwcnMethod({
    method: 'PUT',
    path: '/{Id}',
    urlParams: ['appId',"Id"]
  }),

  delete: pwcnMethod({
    method: 'DELETE',
    path: '/{Id}',
    urlParams: ['appId',"Id"]
  }),

  createCoupon: pwcnMethod({
    method: 'POST',
    path: '/{couponTmplId}/coupons',
    urlParams: ['appId','couponTmplId']
  }),

  listCoupons: pwcnMethod({
    method: 'GET',
    path: '/{couponTmplId}/coupons',
    urlParams: ['appId','couponTmplId']
  }),

});
