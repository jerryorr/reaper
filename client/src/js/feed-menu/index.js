var Backbone = require('backbone')
  , FeedList = require('./feed-list-view')

module.exports = Backbone.View.extend({
  className: 'fr-feed-menu col-sm-2',

  render: function () {
    var feedList = new FeedList({
      collection: this.collection
    })
    this.$el.append(feedList.render().el)

    this.listenTo(feedList, 'feed:select', function (feedModel) {
      this.trigger('feed:select', feedModel)
    })

    return this
  }
})