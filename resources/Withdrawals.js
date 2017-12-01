'use strict';

var PwcnResource = require('../PwcnResource');
var pwcnMethod = PwcnResource.method;

module.exports = PwcnResource.extend({

  path: 'apps/{appId}/withdrawals',

  create: pwcnMethod({
    method: 'POST',
    urlParams: ['appId']
  }),

  retrieve: pwcnMethod({
    method: 'GET',
    path: '/{Id}',
    urlParams: ['appId', 'Id']
  }),

  list: pwcnMethod({
    method: 'GET',
    urlParams: ['appId']
  }),

  update: pwcnMethod({
    method: 'PUT',
    path: '/{Id}',
    urlParams: ['appId', 'Id']
  }),

  cancel: function(appId, Id, callback){
    this.update(appId, Id, {
      'status': 'canceled'
    }, callback);
  },

  confirm: function(appId, Id, callback){
    this.update(appId, Id, {
      'status': 'pending'
    }, callback);
  },

});
