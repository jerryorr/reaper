var ArticleView = require('../../src/js/feed-content/article-view')
  , Article = require('../../src/js/feed-content/article')
  , assert = chai.assert
  , $ = require('jQuery')

// TODO this needs to be in a place for all tests
var Backbone = require('backbone')
Backbone.$ = require('jQuery')

describe('article-view', function () {
  var article, view

  beforeEach(function () {
    article = new Article({
      id: 'id1',
      title: 'title1',
      summary: 'summary1',
      description: 'description1',
      link: 'http://jerryorr.com/link1'
    })
  })

  afterEach(function () {
    view && view.remove()
  })

  it ('renders', function () {
    view = new ArticleView({model: article}).render()

    assertTitle(view, 'title1')
    assertSummary(view, 'summary1')
    assertLink(view, 'http://jerryorr.com/link1')
    assertDescription(view, null)
  })

  it ('shows full description/content on title click', function (done) {
    view = new ArticleView({model: article}).render()
    // Need to have view in DOM so we get iframe load event
    $('body').append(view.el)

    view.on('ready:iframe', function () {
      assertTitle(view, 'title1')
      assertSummary(view, null)
      assertLink(view, 'http://jerryorr.com/link1')
      assertDescription(view, 'description1')

      done()
    })

    view.$el.find('.title').click()
  })

  function assertTitle(view, html) {
    if (html) {
      assert.equal(view.$el.find('.title').html(), html)
    } else {
      assert.equal(view.$el.find('.title').length, 0, 'expected no title')
    }
  }

  function assertSummary(view, html) {
    if (html) {
      assert.equal(view.$el.find('.summary').html(), html)
    } else {
      assert.equal(view.$el.find('.summary').length, 0, 'expected no summary')
    }
  }

  function assertLink(view, href) {
    if (href) {
      assert.equal(view.$el.find('a.link').attr('href'), href)
    } else {
      assert.equal(view.$el.find('a.link').length, 0, 'expected no link')
    }
  }

  function assertDescription(view, startsWith) {
    if (startsWith) {
      var descriptionIframe = view.$el.find('iframe.description')[0]
      assert(descriptionIframe, 'expected description iframe')
      var description = descriptionIframe.contentDocument.body.innerHTML
      assert(description, 'expected description')
      // assert(description.match(new RegExp('/^' + startsWith)), 'expected description to start with "' + startsWith + '" but was "' + description + '"')
      assert.match(description, new RegExp('^' + startsWith))
    } else {
      assert.equal(view.$el.find('.description').length, 0, 'expected no description')
    }
  }
})