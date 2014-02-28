var Backbone = require('backbone')
  _ = require('underscore')

var FeedItem = Backbone.View.extend({
  className: 'fr-feed-list-item',

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

    // this.$el.append(feedCount ? 'You have ' + feedCount + ' feeds' :  'Add some feeds to get started!')

    var self = this

    this.feedViews = this.collection.map(function (feed) {
      return new FeedItem({model: feed})
    })

    _.each(this.feedViews, function (feed) {
      self.$el.append(feed.render().el)
      self.listenTo(feed, 'select', function (selectedFeedModel) {
        _.chain(self.feedViews).filter(function (feed) {
          return feed.model.get('_id') !== selectedFeedModel.get('_id')
        }).each(function (feed) {
          feed.toggleSelect(false)
        })

        self.trigger('feed:select', selectedFeedModel)
      })
    })

    return this
  }
})

