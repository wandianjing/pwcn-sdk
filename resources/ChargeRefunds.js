'use strict';

var PwcnResource = require('../PwcnResource');

module.exports = PwcnResource.extend({

  path: 'charges/{chargeId}/refunds',

  includeBasic: [
    'create', 'list', 'retrieve',
  ],

});
