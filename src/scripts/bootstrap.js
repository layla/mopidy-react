import App from 'kioc';
import config from '../../config'

var app = new App({
  config: config
});

app.use(require('./clients/mopidy'), true);
app.use(require('./clients/pouchdb'), true);
app.use(require('./services/mopidy'), true);
app.use(require('./services/storage'), true);

module.exports = app;
