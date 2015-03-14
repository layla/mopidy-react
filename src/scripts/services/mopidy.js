import Mopidy from "mopidy";
import BBPromise from "bluebird";

var MopidyService = {
  attachKey: 'services.mopidy',

  attach: function (app) {
    return new Promise((resolve) => {
      var mopidy = new Mopidy({
        webSocketUrl: 'ws://' + app.config.mopidy.host + '/mopidy/ws/'
      });
      mopidy.on(console.log.bind(console));
      mopidy.on('state:online', () => {
        resolve(mopidy);
      });
    });
  }
};

export default MopidyService;
