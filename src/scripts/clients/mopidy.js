import Mopidy from 'mopidy';
import BBPromise from 'bluebird';

var MopidyService = {
  attachKey: 'clients.mopidy',

  attach: function (app) {
    return new Promise((resolve) => {
      var mopidy = new Mopidy({
        webSocketUrl: 'ws://' + app.config.mopidy.host + '/mopidy/ws/'
      });
      mopidy.on((a, msg) => {
        msg && msg.method ?
          console.log('<-', msg.method) :
          (msg ? console.log('->', JSON.parse(msg.data)) : console.log('->', msg));
      });
      mopidy.on('state:online', () => {
        resolve(mopidy);
      });
    });
  }
};

export default MopidyService;
