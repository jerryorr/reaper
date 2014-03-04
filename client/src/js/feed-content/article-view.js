var Backbone = require('backbone')
  , _ = require('underscore')

module.exports = Backbone.View.extend({
  className: 'fr-feed-content-article',

  render: function () {
    this.$el.append('<span class="title">' + this.model.get('title') + '</span>'
      + '<span class="description">' + this.model.get('description') + '</span>'
      + '<a class="link btn btn-default" target="fr-' + this.model.id + '" href="' + this.model.get('link') + '" title="View Full Page">'
      + '<span class="glyphicon glyphicon-arrow-right"></span></a>')
    return this
  }
})