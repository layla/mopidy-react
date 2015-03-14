var Mopidy = require('mopidy');
var BBPromise = require('bluebird');

var app = {};

app.mopidy = new BBPromise((resolve) => {
  var mopidy = new Mopidy({
    webSocketUrl: 'ws://musicbox.local:6680/mopidy/ws/'
  });
  mopidy.on(console.log.bind(console));
  mopidy.on('state:online', () => {
    resolve(mopidy);
  });
});

module.exports = app;
