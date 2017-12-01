'use strict';

var PwcnResource = require('../PwcnResource');
var pwcnMethod = PwcnResource.method;

module.exports = PwcnResource.extend({

  path: 'apps/{appId}/sub_apps',

  create: pwcnMethod({
    method: 'POST',
    urlParams: ['appId']
  }),

  list: pwcnMethod({
    method: 'GET',
    urlParams: ['appId']
  }),

  retrieve: pwcnMethod({
    method: 'GET',
    path: '/{subAppId}',
    urlParams: ['appId', 'subAppId']
  }),

  update: pwcnMethod({
    method: 'PUT',
    path: '/{subAppId}',
    urlParams: ['appId', 'subAppId']
  }),

  delete: pwcnMethod({
    method: 'DELETE',
    path: '/{subAppId}',
    urlParams: ['appId', 'subAppId']
  }),

  createChannel: pwcnMethod({
    method: 'POST',
    path: '/{subAppId}/channels',
    urlParams: ['appId', 'subAppId']
  }),

  updateChannel: pwcnMethod({
    method: 'PUT',
    path: '/{subAppId}/channels/{channelName}',
    urlParams: ['appId', 'subAppId', 'channelName']
  }),

  retrieveChannel: pwcnMethod({
    method: 'GET',
    path: '/{subAppId}/channels/{channelName}',
    urlParams: ['appId', 'subAppId', 'channelName']
  }),

  deleteChannel: pwcnMethod({
    method: 'DELETE',
    path: '/{subAppId}/channels/{channelName}',
    urlParams: ['appId', 'subAppId', 'channelName']
  }),

});
