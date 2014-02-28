var FeedMenu = require('./feed-menu')
  , FeedContent = require('./feed-content')
  , $ = require('jQuery')
  , Backbone = require('backbone')
  , Feeds = require('./feed-menu/feeds')
  , Feed = require('./feed-menu/feed')
  , Articles = require('./feed-content/articles')
  , Article = require('./feed-content/article')

Backbone.$ = $

// TODO set up XHR
var models = [
  new Feed({ _id: '1', name: 'Coding Horror'}),
  new Feed({ _id: '2', name: 'Jerry on Java'})
]

var articles = {
  1: [
    new Article({
      _id: 'a1',
      title: 'Something about Discourse',
      description: 'This is a blog post about Discourse. It might be really long, or just a summary.',
      link: 'http://codinghorror.com'
    }),
    new Article({
      _id: 'a2',
      title: 'Awesome advice',
      description: 'Some strongly worded advice about a programming topic. It should at least be long enough for the description to wrap in the RSS Feed content area.',
      link: 'http://codinghorror.com'
    }),
    new Article({
      _id: 'a3',
      title: 'Something else about some other topic',
      description: 'Some more strongly worded advice about some other programming topic. It should at least be long enough for the description to wrap in the RSS Feed content area.',
      link: 'http://codinghorror.com'
    })
  ],
  2: [
    new Article({
      _id: 'a4',
      title: 'Something nobody is reading',
      description: 'Some article I wrote that nobody cares about',
      link: 'http://blog.jerryorr.com'
    })
  ]
}

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
  articleCollection = new Articles()
  articleCollection.reset(articles[feedModel.id])
  feedContent = new FeedContent({model: feedModel, collection: articleCollection})
  $('#content').append(feedContent.render().el)
})

