var $ = require('jQuery')

module.exports.test = function (msg) {
  $('body').append('from testmod.js - watch me')
}