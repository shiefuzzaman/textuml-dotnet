var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(function(require) {
  var Backbone, CodeEditorView, EditorView, OutputGeneratorView, Parser, events, _ref;

  Backbone = require('backbone');
  CodeEditorView = require('./codeeditor');
  OutputGeneratorView = require('./outputgenerator');
  Parser = require('../uml/language/sequence/parser');
  events = require('../events');
  return EditorView = (function(_super) {
    __extends(EditorView, _super);

    function EditorView() {
      _ref = EditorView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    EditorView.prototype.el = '#editor-container';

    EditorView.prototype.codeEditorViewType = CodeEditorView;

    EditorView.prototype.outputGeneratorViewType = OutputGeneratorView;

    EditorView.prototype.parserType = Parser;

    EditorView.prototype.initialize = function(options) {
      var callbacks;

      this.context = options.context;
      this.code = new this.codeEditorViewType({
        context: this.context
      });
      this.output = new this.outputGeneratorViewType;
      callbacks = {
        onStart: function() {
          return events.trigger('parseStarted');
        },
        onWarning: function(message) {
          return events.trigger('parseWarning', {
            message: message
          });
        },
        onError: function(exception) {
          return events.trigger('parseError', {
            message: exception.message
          });
        },
        onComplete: function(e) {
          return events.trigger('parseCompleted', e);
        }
      };
      this.parser = new this.parserType({
        callbacks: callbacks
      });
      this.listenTo(events, 'codeChanged', this.onCodeChanged);
      this.listenTo(events, 'documentContentChanged', this.onDocumentContentChanged);
      this.codeLabel = this.$('#code-section').find('.title-bar').find('span').first();
      return this.listenTo(events, 'documentChanged', this.onDocumentChanged);
    };

    EditorView.prototype.onCodeChanged = function(e) {
      return this.parser.parse(e.code);
    };

    EditorView.prototype.onDocumentContentChanged = function(e) {
      return this.code.setContent(e.code);
    };

    EditorView.prototype.onDocumentChanged = function() {
      var title;

      title = 'Code';
      if (!this.context.isCurrentDocumentEditable()) {
        title += ' (readonly)';
      }
      return this.codeLabel.text(title);
    };

    return EditorView;

  })(Backbone.View);
});
