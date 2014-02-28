var Backbone = require('backbone')
  , FeedItemList = require('./feed-item-list-view')

module.exports = Backbone.View.extend({
  className: 'fr-feed-content col-sm-10',

  render: function () {
    this.$el.append('<h1>' + this.model.get('name') + '</h1>')
    this.$el.append(new FeedItemList({
      model: this.model
    }).render().el)
    return this
  }
})