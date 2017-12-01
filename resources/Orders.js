'use strict';

var PwcnResource = require('../PwcnResource');
var pwcnMethod = PwcnResource.method;

module.exports = PwcnResource.extend({

  path: 'orders',

  includeBasic: [
    'create','list','retrieve'
  ],

  update: pwcnMethod({
    method: 'PUT',
    path: '{id}',
    urlParams: ['id']
  }),

  cancel: function(id,callback){
    this.update(id,{
      "status":" canceled"
    },callback);
  },

  pay: pwcnMethod({
    method: 'POST',
    path: '/{orderId}/pay',
    urlParams: ['orderId']
  }),

  createRefund: pwcnMethod({
    method: 'POST',
    path: '/{orderId}/refunds',
    urlParams: ['orderId']
  }),


  listRefunds: pwcnMethod({
    method: 'GET',
    path: '/{orderId}/refunds',
    urlParams: ['orderId']
  }),

  retrieveRefund: pwcnMethod({
    method: 'GET',
    path: '/{orderId}/refunds/{refundId}',
    urlParams: ['orderId','refundId']
  }),

});
