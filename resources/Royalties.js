'use strict';

var PwcnResource = require('../PwcnResource');
var pwcnMethod = PwcnResource.method;

module.exports = PwcnResource.extend({

  path: 'royalties',

  includeBasic: [
    'list', 'retrieve'
  ],

  batchUpdate: pwcnMethod({
    method: 'PUT'
  }),

});
