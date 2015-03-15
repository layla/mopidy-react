import BBPromise from 'bluebird';

class StorageService {
  constructor(storageClient) {
    this.storageClient = storageClient;
  }

  get(key) {
    return this.storageClient.get(key)
      .then((result) => {
        return result.value;
      })
      .catch((err) => {
        return null;
      });
  }

  set(key, value) {
    return this.storageClient.get(key)
      .then((result) => {
        return this.storageClient.put({
          value: value
        }, key, result._rev);
      })
      .catch((err) => {
        return this.storageClient.put({
          value: value
        }, key);
      });
  }
}

StorageService.attachKey = 'services.storage';

StorageService.attach = (app) => {
  return app.get('clients.pouchdb')
    .then((storage) => {
      return new StorageService(storage);
    });
}

export default StorageService;
