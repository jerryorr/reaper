var FeedMenu = require('./feed-menu')
  , FeedContent = require('./feed-content')
  , $ = require('jQuery')
  , Backbone = require('backbone')
  , Feeds = require('./feed-menu/feeds')
  , Feed = require('./feed-menu/feed')

Backbone.$ = $

// TODO set up XHR
var models = [
  new Feed({ _id: '1', name: 'Coding Horror'}),
  new Feed({ _id: '2', name: 'Jerry on Java'})
]

var feeds = new Feeds()
feeds.reset(models)

var feedMenu = new FeedMenu({
  collection: feeds
})

$('#content').append(feedMenu.render().el)


var feedContent;
feedMenu.on('feed:select', function (feedModel) {
  // TODO maybe update instead of destroy
  // TODO change to release once implemented
  feedContent && feedContent.remove()
  feedContent = new FeedContent({model: feedModel})
  $('#content').append(feedContent.render().el)
})

