import _ from 'underscore';
import Mopidy from 'mopidy';
import BBPromise from 'bluebird';

class MopidyService {
  constructor(mopidyClient, storageService) {
    this.mopidyClient = mopidyClient;
    this.storageService = storageService;
  }

  getPlayerData() {
    return BBPromise.join(
      this.mopidyClient.playback.getCurrentTrack(),
      this.mopidyClient.playback.getMute(),
      this.mopidyClient.playback.getState(),
      this.mopidyClient.playback.getVolume(),
      this.mopidyClient.playback.getTimePosition()
    )
    .spread((currentTrack, isMuted, state, volume, timePosition) => {
      return {currentTrack, isMuted, state, volume, timePosition};
    });
  }

  setVolume(volume) {
    return this.mopidyClient.playback.setVolume(volume);
  }

  getTracklist(start, end) {
    return this.mopidyClient.tracklist.slice(start, end);
  }

  getPlaylists() {
    return this.mopidyClient.playlists.getPlaylists();
  }

  search(query) {
    return this.mopidyClient.library.search({ any: [query] })
      .then((searchResults) => this.searchResultsToTracks(searchResults))
      .then((tracks) => {
        return BBPromise.join(
          tracks,
          this.updateLastSearches(query)
        );
      })
      .spread((tracks) => {
        return tracks;
      });
  }

  searchResultsToTracks(searchResults) {
    var tracks = _.reduce(searchResults, (memo, searchResult, index) => {
      return memo.concat(searchResult.tracks || []);
    }, []);
    return tracks;
  }

  updateLastSearches(query) {
    return this.storageService.get('lastsearches')
      .then((lastSearches) => {
        let newSearches = lastSearches || [];
        let exists = _.contains(newSearches, query);
        if (newSearches.length === 5 && ! exists) {
          newSearches.shift();
        }
        if ( ! exists) {
          newSearches.push(query);
        }
        return this.storageService.set('lastsearches', newSearches);
      });
  }
}

MopidyService.attachKey = 'services.mopidy';

MopidyService.attach = (app) => {
  return BBPromise.join(
    app.get('clients.mopidy'),
    app.get('services.storage')
  )
  .spread((mopidyClient, storageService) => {
    return new MopidyService(mopidyClient, storageService);
  });
};

export default MopidyService;
