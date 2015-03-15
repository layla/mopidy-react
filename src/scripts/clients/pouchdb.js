import PouchDB from 'pouchdb';
import BBPromise from 'bluebird';

var PouchDBClient = {
  attachKey: 'clients.pouchdb',

  attach: function (app) {
    return new PouchDB('officebox');
  },
};

export default PouchDBClient;
