var FeedListView = require('../../src/js/feed-menu/feed-list-view')
  , Feeds = require('../../src/js/feed-menu/feeds')
  , Feed = require('../../src/js/feed-menu/feed')
  , assert = chai.assert
  , $ = require('jQuery')

// TODO this needs to be in a place for all tests
// idea: have a backbone-test module, which does the following and exports it
var Backbone = require('backbone')
Backbone.$ = require('jQuery')

describe('feed-list-view', function () {
  var feeds;

  beforeEach(function () {
    feeds = new Feeds()
    feeds.reset([
      new Feed({_id: '1', name: 'Coding Horror'}),
      new Feed({_id: '2', name: 'Jerry on Java'}),
      new Feed({_id: '3', name: 'Joel on Software'})
    ])
  })

  it('renders', function () {
    assert(FeedListView, 'FeedListView module should be defined')
    var listView = new FeedListView({collection: feeds}).render()

    assert.equal(listView.$el.find('.fr-feed-list-feed').length, 3)
  })

  it('raises feed:select event on click', function (done) {
    var listView = new FeedListView({collection: feeds}).render()

    listView.on('feed:select', function (feedModel) {
      assert(feedModel)
      assert.equal(feedModel.id, '2')
      done()
    })

    listView.$el.find('.fr-feed-list-feed')[1].click()
  })

  it('adds .select to clicked item, removes on others', function () {
    var listView = new FeedListView({collection: feeds}).render()

    var items = listView.$el.find('.fr-feed-list-feed')

    function assertSelected(selectedIndex) {
      items.each(function (i, item) {
        var shouldBeSelected = selectedIndex === i
          , $item = $(item)

        assert((shouldBeSelected ? $item.hasClass('selected') : !$item.hasClass('selected')),
          'expected index ' + i + ' to ' + (shouldBeSelected ? '' : 'not ') + 'be selected when index ' + selectedIndex + ' is selected')
      })
    }

    assertSelected(null)
    items[1].click()
    assertSelected(1)
    items[0].click()
    assertSelected(0)
  })
})