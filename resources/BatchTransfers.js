'use strict';

var PwcnResource = require('../PwcnResource');
var pwcnMethod = PwcnResource.method;

module.exports = PwcnResource.extend({

  path: 'batch_transfers',

  includeBasic: [
    'create', 'list', 'retrieve'
  ],

  update: pwcnMethod({
    method: 'PUT',
    path: '{id}',
    urlParams: ['id']
  }),

  cancel: function(id, callback){
    this.update(id, {
      'status': 'canceled'
    }, callback);
  }

});
