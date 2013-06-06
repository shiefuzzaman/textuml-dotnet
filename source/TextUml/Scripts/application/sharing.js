﻿
define(function(require) {
  var $, proxy;
  $ = require('jquery');
  require('signalr');
  require('hubs');
  proxy = $.connection.sharingHub;
  return {
    start: function() {
      return $.connection.hub.start().done(function() {
        return console.log('Signalr Connected');
      });
    },
    stop: function() {}
  };
});