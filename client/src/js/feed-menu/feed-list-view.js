var Backbone = require('backbone')
  _ = require('underscore')

var FeedListFeedView = Backbone.View.extend({
  className: 'fr-feed-list-feed',

  events: {
    'click': '_select'
  },

  render: function () {
    this.$el.append(this.model.get('name'))
    return this
  },

  toggleSelect: function (select) {
    this.$el.toggleClass('selected', select)
    this.trigger(select ? 'select' : 'unselect', this.model)
  },

  _select: function () {
    this.toggleSelect(true)
  },

  selected: function () {
    return this.$el.hasClass('selected')
  }
})

module.exports = Backbone.View.extend({
  className: 'fr-feed-list',

  render: function () {
    var feedCount = this.collection.size()

    var self = this

    this.feedViews = this.collection.map(function (feed) {
      return new FeedListFeedView({model: feed})
    })

    _.each(this.feedViews, function (feedView) {
      self.$el.append(feedView.render().el)
      self.listenTo(feedView, 'select', function (selectedFeed) {
        _.chain(self.feedViews).filter(function (feedView) {
          return feedView.model.get('_id') !== selectedFeed.get('_id')
        }).each(function (feedView) {
          feedView.toggleSelect(false)
        })

        self.trigger('feed:select', selectedFeed)
      })
    })

    return this
  }
})

