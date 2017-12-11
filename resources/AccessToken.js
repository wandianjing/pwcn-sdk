'use strict';

var PwcnResource = require('../PwcnResource');
var pwcnMethod = PwcnResource.method;

module.exports = PwcnResource.extend({

    path: 'auth',
    refreshToken: pwcnMethod({
        method: 'GET',
        path: '/{companyId}',
        urlParams: ['companyId']
    }),
    token: pwcnMethod({
        method: 'POST',
        path: '/accessToken',
        urlParams: []
    })

});