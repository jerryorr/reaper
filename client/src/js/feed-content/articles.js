var Backbone = require('backbone')
  , Article = require('./article')

module.exports = Backbone.Collection.extend({
  model: Article
})