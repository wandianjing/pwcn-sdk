'use strict';

var PwcnResource = require('../PwcnResource');
var pwcnMethod = PwcnResource.method;

module.exports = PwcnResource.extend({

    path: 'company',
    retrieve: pwcnMethod({
        method: 'GET',
        path: '/{userId}',
        urlParams: ['userId']
    }),

});