var WelcomeView = require('./welcome-view')
  , $ = require('jQuery')
  , Backbone = require('backbone')

Backbone.$ = $
// testmod.test('app started')

$('body').append('from app.js')

$('#container').append(new WelcomeView().render().el)