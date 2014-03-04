var ArticleView = require('../../src/js/feed-content/article-view')
  , Article = require('../../src/js/feed-content/article')
  , assert = chai.assert
  , $ = require('jQuery')

// TODO this needs to be in a place for all tests
var Backbone = require('backbone')
Backbone.$ = require('jQuery')

describe('article-view', function () {
  var article

  beforeEach(function () {
    article = new Article({
      id: 'id1',
      title: 'title1',
      description: 'description1',
      link: 'http://jerryorr.com/link1'
    })
  })

  it ('renders', function () {
    var view = new ArticleView({model: article}).render()

    assert.equal(view.$el.find('.title').html(), 'title1')
    assert.equal(view.$el.find('.description').html(), 'description1')
    assert.equal(view.$el.find('a.link').attr('href'), 'http://jerryorr.com/link1')
  })
})