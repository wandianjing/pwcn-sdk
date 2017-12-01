'use strict';

var PwcnResource = require('../PwcnResource');

module.exports = PwcnResource.extend({

  path: 'events',
  includeBasic: [
    'retrieve'
  ],

});
