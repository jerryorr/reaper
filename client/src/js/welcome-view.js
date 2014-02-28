var Backbone = require('backbone')

module.exports = Backbone.View.extend({
  className: 'well',

  render: function () {
    this.$el.append('Welcome to Feed Reaper. Add some feeds to get started!')
    return this
  }
})