import App from 'kioc';
import config from '../../config'

var app = new App({
  config: config
});

app.use(require('./services/mopidy'), true);

module.exports = app;
