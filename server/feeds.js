var FeedParser = require('feedparser')
  , request = require('request')
  , _ = require('underscore')
  , OutStream = require('./outstream')

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

// TODO return stream instead of buffering the whole thing
module.exports.articles = function (feedId) {
  var out = new OutStream()

  var feed = getFeed(feedId)

  var req = request(feed.url)
    , feedparser = new FeedParser()

  req.on('error', function (error) {
    next(err)
  })
  req.on('response', function (res) {
    var stream = this

    if (res.statusCode != 200) return this.emit('error', new Error('Bad status code'))

    stream.pipe(feedparser)
  })


  feedparser.on('error', function(error) {
    next(err)
  })
  feedparser.on('readable', function() {
    // This is where the action is!
    var stream = this
      , meta = this.meta // **NOTE** the "meta" is always available in the context of the feedparser instance
      , item

    while (item = stream.read()) {
      var article = {
        _id: item.link,
        title: item.title,
        description: item.description,
        link: item.link
      }

      out.write(JSON.stringify(article))
    }
  })
  feedparser.on('end', function () {
    out.emit('end')
  })

  return out
}