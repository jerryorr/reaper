var express = require('express')
var app = express()

// New call to compress content
app.use(express.compress())

app.use(express.static(__dirname + '/client'))

app.get('/api/feeds', function (req, res) {
  // var models = [x
  //   new Feed({ _id: '1', name: 'Coding Horror'}),
  //   new Feed({ _id: '2', name: 'Jerry on Java'})
  // ]

  res.json([
    { _id: '1', name: 'Coding Horror'},
    { _id: '2', name: 'Jerry on Java'}
  ]);

})

app.get('/api/feeds/:feedId/articles', function (req, res) {
  var articles = {
    1: [
      {
        _id: 'a1',
        title: 'Something about Discourse',
        description: 'This is a blog post about Discourse. It might be really long, or just a summary.',
        link: 'http://codinghorror.com'
      },
      {
        _id: 'a2',
        title: 'Awesome advice',
        description: 'Some strongly worded advice about a programming topic. It should at least be long enough for the description to wrap in the RSS Feed content area.',
        link: 'http://codinghorror.com'
      },
      {
        _id: 'a3',
        title: 'Something else about some other topic',
        description: 'Some more strongly worded advice about some other programming topic. It should at least be long enough for the description to wrap in the RSS Feed content area.',
        link: 'http://codinghorror.com'
      }
    ],
    2: [
      {
        _id: 'a4',
        title: 'Something nobody is reading',
        description: 'Some article I wrote that nobody cares about',
        link: 'http://blog.jerryorr.com'
      }
    ]
  }


  res.json(articles[req.params.feedId]);

})


app.listen(process.env.PORT || 3000)