var FeedMenu = require('./feed-menu')
  , FeedContent = require('./feed-content')
  , $ = require('jQuery')
  , Backbone = require('backbone')
  , Feeds = require('./feed-menu/feeds')
  , Feed = require('./feed-menu/feed')
  , Articles = require('./feed-content/articles')
  , Article = require('./feed-content/article')

Backbone.$ = $

var feeds = new Feeds()

var feedMenu = new FeedMenu({
  collection: feeds
})

feeds.fetch({
  success: function () {
    $('#content').append(feedMenu.render().el)
  }
})

var feedContent;
feedMenu.on('feed:select', function (feedModel) {
  // TODO maybe update instead of destroy
  // TODO change to release once implemented
  feedContent && feedContent.remove()

  articleCollection = new Articles({feed: feedModel})
  // TODO only fetch if I haven't already fetched and set up a websocket
  articleCollection.fetch({
    success: function () {
      feedContent = new FeedContent({model: feedModel, collection: articleCollection})
      $('#content').append(feedContent.render().el)
    }
  })
})

