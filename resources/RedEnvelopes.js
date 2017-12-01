'use strict';

var PwcnResource = require('../PwcnResource');
var pwcnMethod = PwcnResource.method;

module.exports = PwcnResource.extend({

  path: 'red_envelopes',

  includeBasic: [
    'create','list','retrieve'
  ],

});
