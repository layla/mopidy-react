import BBPromise from 'bluebird';

class StorageService {
  constructor(storageClient) {
    this.storageClient = storageClient;
  }

  getLastSearches() {
    return this.storageClient.get('lastsearches')
      .then((result) => {
        return result.searches;
      })
      .catch((err) => {
        return [];
      });
  }

  setLastSearches(newSearches) {
    return this.storageClient.get('lastsearches')
      .then((result) => {
        return this.storageClient.put({
          searches: newSearches
        }, 'lastsearches', result._rev);
      })
      .catch((err) => {
        return this.storageClient.put({
          searches: newSearches
        }, 'lastsearches');
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
