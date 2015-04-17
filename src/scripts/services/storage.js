import BBPromise from 'bluebird';

/**
 * @class services.StorageService
 */
class StorageService {
  /**
   *
   * @param {clients.PouchDBClient} storageClient
   */
  constructor(storageClient) {
    this.storageClient = storageClient;
  }

  /**
   * get
   *
   * Retrieves data by a key.
   *
   * @param key
   * @returns {*}
   */
  get(key) {
    return this.storageClient.get(key)
      .then((result) => {
        return result.value;
      })
      .catch((err) => {
        console.log('Ignoring storage error', err);
        return null;
      });
  }

  /**
   * set
   *
   * Stores data under a key.
   *
   * @param key
   * @param value
   * @returns {*}
   */
  set(key, value) {
    return this.storageClient.get(key)
      .then((result) => {
        return this.storageClient.put({
          value: value
        }, key, result._rev);
      })
      .catch(() => {
        return this.storageClient.put({
          value: value
        }, key);
      });
  }
}

StorageService.attachKey = 'services.storage';

StorageService.attach = (app) => {
  var storage = app.get('clients.pouchdb');
  return BBPromise.resolve(new StorageService(storage));
};

export default StorageService;
