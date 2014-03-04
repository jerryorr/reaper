var Backbone = require('backbone')
  , _ = require('underscore')

module.exports = Backbone.View.extend({
  className: 'fr-feed-content-article',

  render: function () {
    this.$el.append('<span class="title">' + this.model.get('title') + '</span><span>' + this.model.get('description') + '</span>')
    return this
  }
})