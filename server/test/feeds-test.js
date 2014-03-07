var feeds = require('../feeds')
  , nock = require('nock')
  , chai = require('chai')
  , assert = chai.assert

chai.Assertion.includeStack = true

// TODO if I use nock, am I really testing just this module? This is testing feed-reader, too
describe('feed-reader', function () {
  it('returns properly populated articles', function (done) {
    var scope = nock('http://blog.jerryorr.com')
      .get('/feed')
      .replyWithFile(200, __dirname + '/goodfeed.xml')

    feeds.readFeed({url: 'http://blog.jerryorr.com/feed'}, function (err, articles) {
      if (err) { done(err) }

      assert.equal(articles.length, 9)

      var a = articles[0]
      assert(a)
      assert.equal(a._id, 'tag:blogger.com,1999:blog-6466545174058573557.post-7994955495043480461')
      assert.equal(a.link, 'http://blog.jerryorr.com/2013/10/using-nodejs-streams-to-massage-data.html')
      assert.equal(a.title, 'Using Node.js streams to massage data into the format you want')
      assert(/^Google provides some pretty cool flu data.*/.test(a.description))

      done()
    })
  })

  it('uses link for _id if no guid', function (done) {
    var scope = nock('http://blog.jerryorr.com')
      .get('/feed')
      .replyWithFile(200, __dirname + '/no-id.xml')

    feeds.readFeed({url: 'http://blog.jerryorr.com/feed'}, function (err, articles) {
      if (err) { done(err) }

      assert.equal(articles.length, 1)

      var a = articles[0]
      assert(a)
      assert.equal(a._id, a.link)
      assert.equal(a.link, 'http://blog.jerryorr.com/2013/10/using-nodejs-streams-to-massage-data.html')
      assert.equal(a.title, 'Using Node.js streams to massage data into the format you want')
      assert(/^Google provides some pretty cool flu data.*/.test(a.description))

      done()
    })
  })

  it('uses title hash for _id if no guid or link', function (done) {
    var scope = nock('http://blog.jerryorr.com')
      .get('/feed')
      .replyWithFile(200, __dirname + '/no-id-no-link.xml')

    feeds.readFeed({url: 'http://blog.jerryorr.com/feed'}, function (err, articles) {
      if (err) { done(err) }

      assert.equal(articles.length, 1)

      var a = articles[0]
      assert(a)
      assert.equal(a._id, '8c9abe2fc7503d30e7b2b43e1723319092e1bb53')
      assert(!a.link)
      assert.equal(a.title, 'Using Node.js streams to massage data into the format you want')
      assert(/^Google provides some pretty cool flu data.*/.test(a.description))

      done()
    })
  })
})