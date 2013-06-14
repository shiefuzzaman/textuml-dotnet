﻿define 'jquery', -> jQuery

require.config
  baseUrl: '/Scripts'
  paths:
    'jquery.migrate'              : './jquery-migrate-1.1.1'
    'jquery.cookie'               : './jquery.cookie'
    'jquery.splitter'             : './jquery.splitter'
    bootstrap                     : './bootstrap'
    underscore                    : './underscore'
    backbone                      : './backbone'
    kinetic                       : './kinetic-v4.4.3'
    moment                        : './moment'
    codemirror                    : './codemirror/codemirror'
    codemirrormarkselection       : './codemirror/addon/selection/active-line'
    codemirroractiveline          : './codemirror/addon/selection/mark-selection'
    signalr                       : './jquery.signalR-1.1.2'
    hubs                          : './hubs'
    confirm                       : 'application/lib/confirm'
    flashbar                      : 'application/lib/flashbar'
    form                          : 'application/lib/form'
  shim:
    jquery:
      exports: '$'
      init: -> @.$.noConflict()
    'jquery.migrate': ['jquery']
    'jquery.cookie': ['jquery', 'jquery.migrate']
    'jquery.splitter': ['jquery', 'jquery.migrate', 'jquery.cookie']
    signalr: ['jquery']
    hubs: ['jquery', 'signalr']
    underscore:
      exports: '_'
      init: ->
        @._.templateSettings =
          interpolate   : /\{\{(.+?)\}\}/g
        @._
    backbone:
      deps: ['jquery', 'underscore']
      exports: 'Backbone'
    codemirror:
      exports: 'CodeMirror'
    codemirrormarkselection: ['codemirror']
    codemirroractiveline: ['codemirror']