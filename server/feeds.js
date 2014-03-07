var FeedParser = require('feedparser')
  , request = require('request')
  , _ = require('underscore')
  , OutStream = require('./outstream')
  , feedReader = require('./feed-reader')

// TODO eventually get this list from a real data store
var feeds = [
  { _id: '1', name: 'Coding Horror', url: 'http://feeds.feedburner.com/codinghorror'},
  { _id: '2', name: 'Jerry on Java', url: 'http://blog.jerryorr.com/feeds/posts/default'}
]

module.exports.all = function (next) {
  next(null, feeds)
}

function getFeed (feedId) {
  return _.find(feeds, function (feed) {
    return feed._id == feedId
  })
}

module.exports.articles = function (feedId, next) {
  var feed = getFeed(feedId)
    , articles = []
  feedReader.read(feed.url)
    .on('error', function(error) {
      next(err)
    })
    .on('readable', function() {
      var stream = this
        , meta = this.meta
        , item

      while (item = stream.read()) {
        var article = {
          _id: item.link,
          title: item.title,
          description: item.description,
          link: item.link
        }

        articles.push(article)
      }
    })
    .on('end', function () {
      next(null, articles)
    })
}