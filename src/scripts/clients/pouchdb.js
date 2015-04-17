import PouchDB from 'pouchdb';
window.PouchDB = PouchDB;

import BBPromise from 'bluebird';

/**
 * PouchDBClient
 *
 * @class clients.PouchDBClient
 */
let PouchDBClient = {
  attachKey: 'clients.pouchdb',

  attach: () => {
    return new PouchDB('officebox');
  }
};

export default PouchDBClient;
