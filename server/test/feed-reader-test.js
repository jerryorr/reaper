var reader = require('../feed-reader')
  , nock = require('nock')
  , assert = require('chai').assert

describe('feed-reader', function () {
  it('returns feed stream on good url', function (done) {
    var scope = nock('http://blog.jerryorr.com')
      .get('/feed')
      .replyWithFile(200, __dirname + '/goodfeed.xml')

    var articleCount = 0
    reader.read('http://blog.jerryorr.com/feed')
      .on('readable', function () {
        var stream = this
          , item

        while (item = stream.read()) {
          assert(item.title)
          assert(item.description)

          articleCount++
        }
      })
      .on('end', function () {
        assert.equal(articleCount, 9)
        done()
      })
      .on('error', function (err) {
        done(err)
      })
  })

  it('emits error event on 404', function (done) {
    var scope = nock('http://blog.jerryorr.com')
      .get('/feed')
      .reply(404)

    reader.read('http://blog.jerryorr.com/feed')
      .on('readable', function () {
        done(new Error('readable event handler should not be called'))
      })
      .on('end', function () {
        done(new Error('end event handler should not be called'))
      })
      .on('error', function (err) {
        assert(err)
        done()
      })
  })

  it('emits error event on bogus URL', function (done) {
    reader.read('http://thisisnotavalidurlsothisreapertestshouldfail.com')
      .on('readable', function () {
        done(new Error('readable event handler should not be called'))
      })
      .on('end', function () {
        done(new Error('end event handler should not be called'))
      })
      .on('error', function (err) {
        assert(err)
        done()
      })
  })
})