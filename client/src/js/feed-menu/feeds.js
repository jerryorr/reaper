var Backbone = require('backbone')
  , Feed = require('./feed')

module.exports = Backbone.Collection.extend({
  model: Feed
})