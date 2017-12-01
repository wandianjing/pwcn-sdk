'use strict';

var PwcnResource = require('../PwcnResource');

module.exports = PwcnResource.extend({

  path: 'royalty_transactions',

  includeBasic: [
    'list', 'retrieve'
  ],

});
