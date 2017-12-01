var PwcnResource = require('../PwcnResource');
var pwcnMethod = PwcnResource.method;

module.exports = PwcnResource.extend({

  path: 'customs',

  includeBasic: [
    'create','retrieve'
  ],

});