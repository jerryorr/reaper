var express = require('express')
  , feeds = require('./feeds')

module.exports.start = function () {
  app = express()

  app.use(express.compress())

  app.use(express.static(__dirname + '/../client'))

  app.get('/api/feeds', function (req, res) {
    feeds.all(function (err, feeds) {
      if (err) {
        return res.json(500, {error: err})
      }
      res.json(feeds)
    })
  })

  app.get('/api/feeds/:feedId/articles', function (req, res) {
    feeds.articles(req.params.feedId, function (err, feed) {
      if (err) {
        return res.json(500, {error: err})
      }
      res.json(feed.articles)
    })
  })

  var port = process.env.PORT || 3000
  app.listen(port)
  console.log('feed reaper listening on port', port)
}