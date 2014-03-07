var FeedParser = require('feedparser')
  , request = require('request')
  , _ = require('underscore')
  , OutStream = require('./outstream')
  , feedReader = require('./feed-reader')
  , es = require('event-stream')
  , crypto = require('crypto')
  , _ = require('underscore')
  , htmlparser = require('htmlparser2')
  , HtmlEntities = require('html-entities').AllHtmlEntities

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

  readFeed(feed, next)
}

var readFeed = module.exports.readFeed = function (feed, next) {
  var articles = []
    , feedTitle = null
  feedReader.read(feed.url)
    .on('error', function(error) {
      next(err)
    })
    .on('readable', function() {
      feedTitle = this.meta.title
    })
    .pipe(es.map(addId))
    .pipe(es.map(cleanItems))
    .on('data', function(article) {
      articles.push(article)
    })
    .on('end', function () {
      next(null, {
        title: feedTitle,
        articles: articles
      })
    })
}

function addId (item, callback) {
  var id = item.guid

  // feedparser has a few fallbacks for guid, including id and link

  if (!id && item.title) {
    id = crypto.createHash('sha1').update(item.title).digest('hex')
  }

  if (!id) {
    callback(new Error('could not determine an _id for item'))
  }

  callback(null, _.extend({ _id: id }, item))
}

function cleanItems (item, callback) {
  var article = {
    _id: item._id,
    title: item.title,
    description: item.description,
    link: item.link
  }

  var summary = ''
    , htmlEntities = new HtmlEntities()
    , code = false
    , done = false

  var parser = new htmlparser.Parser({
    onopentag: function (tag) {
      if (tag === 'style' || tag === 'script') {
        code = true
      }
    },
    ontext: function(text) {
      if (!code && !done) {
        // TODO this can leave a ton of whitespace between chunks, like on Coding Horror's App-pocolypse Now article
        summary += htmlEntities.decode(text)

        if (summary.length > 100) {
          done = true
          summary = summary.substring(0, 100)
        }
      }
    },
    onclosetag: function (tag) {
      if (tag === 'style' || tag === 'script') {
        code = false
      }
    }
  })

  parser.write(article.description)
  parser.end()

  article.summary = summary
  callback(null, article)
}