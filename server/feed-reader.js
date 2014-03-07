var FeedParser = require('feedparser')
  , request = require('request')
  , _ = require('underscore')
  , OutStream = require('./outstream')
  , es = require('event-stream')

module.exports.read = function (url) {
  var req = request(url)
    , feedparser = new FeedParser()

  req.on('error', function (error) {
    // TODO make sure this actually works
    feedparser.emit('error', error)
  })
  req.on('response', function (res) {
    var stream = this

    // TODO make sure this actually works
    if (res.statusCode != 200) return feedparser.emit('error', new Error('Bad status code: ' + res.statusCode))

    stream.pipe(feedparser)
  })

  return feedparser
}