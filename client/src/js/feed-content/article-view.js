var Backbone = require('backbone')
  , _ = require('underscore')
  , $ = require('jQuery')

module.exports = Backbone.View.extend({
  className: 'fr-feed-content-article',

  events: {
    'click': 'maybeShowFullContent'
  },

  render: function () {
    this.$el.append('<span class="title">' + this.model.get('title') + '</span>'
      + '<a class="link btn btn-default" target="fr-' + this.model.id + '" href="' + this.model.get('link') + '" title="View Full Page">'
      + '<span class="glyphicon glyphicon-arrow-right"></span></a>')


    this.toggleFullContent(false)

    return this
  },

  maybeShowFullContent: function (e) {
    if (this.$el.find('.description').length > 0) {
      return
    }
    if (this.$el.find('.link').has(e.target).length) {
      return
    }

    this.toggleFullContent(true)
  },

  toggleFullContent: function (showFull) {
    if (showFull) {
      this.$el.find('.summary').remove()
      // TODO put some sandboxing restrictions on this
      var iframe = $('<iframe class="description"></iframe>')
      var self = this

      iframe.load(function () {
        var iframeBody = iframe[0].contentDocument.body
        iframeBody.innerHTML = self.model.get('description')

        // TODO this almost works, but any images loading afterwards will
        // may change the height. Could have a resizeIframe function that
        // is called on iframe load AND on each img load
        iframe.attr('height', iframeBody.scrollHeight + 'px')
        iframe.attr('width', iframeBody.scrollWidth + 'px')

        self.trigger('ready:iframe')
      })

      this.$el.append(iframe)
    } else {
      this.$el.append('<span class="summary">' + this.model.get('summary') + '</span>')
      this.$el.find('.description').remove()
    }
  }
})