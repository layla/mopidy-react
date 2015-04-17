import Mopidy from 'mopidy';
import BBPromise from 'bluebird';

/**
 * @class clients.MopidyClient
 */
let MopidyClient = {
  attachKey: 'clients.mopidy',

  attach: (app) => {
    console.info('Attaching mopidy client...');
    return new BBPromise((resolve) => {
      var mopidy = new Mopidy({
        webSocketUrl: 'ws://' + app.config.mopidy.host + '/mopidy/ws/',
        callingConvention: 'by-position-only'
      });
      mopidy.on((a, msg) => {
        console.log(msg);
        // msg && msg.method ?
        //   console.log('<-', msg.method) :
        //   (msg ? console.log('->', JSON.parse(msg.data)) : console.log('->', msg));
      });
      mopidy.on('state:online', () => {
        console.info('Attaching to mopidy client done...');
        resolve(mopidy);
      });
    });
  }
};

export default MopidyClient;
