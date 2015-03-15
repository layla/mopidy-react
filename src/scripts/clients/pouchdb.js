import PouchDB from 'pouchdb';
window.PouchDB = PouchDB;

import BBPromise from 'bluebird';

var PouchDBClient = {
  attachKey: 'clients.pouchdb',

  attach: function (app) {
    return new PouchDB('officebox');
  },
};

export default PouchDBClient;
