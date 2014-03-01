var Backbone = require('backbone')
  , Article = require('./article')

module.exports = Backbone.Collection.extend({
  model: Article,

  initialize: function (options) {
    this.feed = options.feed
  },

  url: function () {
    return '/api/feeds/' + this.feed.id + '/articles'
  }
})