var Backbone = require('backbone')
  , _ = require('underscore')
  , ArticleView = require('./article-view')

module.exports = Backbone.View.extend({
  className: 'fr-feed-content-article-list',

  render: function () {
    var self = this

    this.articleViews = this.collection.map(function (article) {
      return new ArticleView({model: article})
    })

    _.each(this.articleViews, function (articleView) {
      self.$el.append(articleView.render().el)
    })

    return this
  }
})
