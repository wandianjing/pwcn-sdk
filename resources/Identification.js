'use strict';

var PwcnResource = require('../PwcnResource');
var pwcnMethod = PwcnResource.method;

module.exports = PwcnResource.extend({

  path: 'identification',

  identify: pwcnMethod({
    method: 'POST',
  })

});
