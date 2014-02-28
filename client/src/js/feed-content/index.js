var Backbone = require('backbone')
  , ArticleListView = require('./article-list-view')

module.exports = Backbone.View.extend({
  className: 'fr-feed-content col-sm-10',

  render: function () {
    this.$el.append('<h1>' + this.model.get('name') + '</h1>')
    this.$el.append(new ArticleListView({
      model: this.model,
      collection: this.collection
    }).render().el)
    return this
  }
})