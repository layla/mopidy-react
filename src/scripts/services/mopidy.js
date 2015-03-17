import _ from 'underscore';
import Mopidy from 'mopidy';
import BBPromise from 'bluebird';

class MopidyService {
  constructor(mopidyClient, storageService) {
    this.mopidyClient = mopidyClient;
    this.storageService = storageService;
  }

  getCurrentTrack() {
    return this.mopidyClient.playback.getCurrentTrack();
  }

  getCurrentTlTrack() {
    return this.mopidyClient.playback.getCurrentTlTrack();
  }

  getTlTracks() {
    return this.mopidyClient.tracklist.getTlTracks();
  }

  getMute() {
    return this.mopidyClient.playback.getMute();
  }

  setMute(isMuted) {
    return this.mopidyClient.playback.setMute(isMuted);
  }

  getState() {
    return this.mopidyClient.playback.getState();
  }

  getTimePosition() {
    return this.mopidyClient.playback.getTimePosition();
  }

  play() {
    return this.mopidyClient.playback.play();
  }

  pause() {
    return this.mopidyClient.playback.pause();
  }

  previous() {
    return this.mopidyClient.playback.previous();
  }

  next() {
    return this.mopidyClient.playback.next();
  }

  queueNext(tracks) {
    return this.getCurrentTlTrack()
      .then((currentTlTrack) => {
        if (currentTlTrack) {
          return this.getTlTracks()
            .then((tlTracks) => {
              let tlIds = _.pluck(tlTracks, 'tlid');
              let atPosition = tlIds.indexOf(currentTlTrack.tlid);
              return this.mopidyClient.tracklist.add(tracks, atPosition + 1);   
            });
        }
        return this.mopidyClient.tracklist.add(tracks, 0);
      });
  }

  queueNextAndPlay(tracks) {
    return this.queueNext(tracks)
      .then(() => {
        return this.next();
      })
      .then(() => {
        return this.play();
      });
  }

  queueLast(tracks) {
    return this.mopidyClient.tracklist.add(tracks);
  }

  addToPlaylist(tracks, playlist) {
    return;
  }

  seek(timePosition) {
    console.log('send seek to client', timePosition);
    return this.mopidyClient.playback.seek(timePosition)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  getVolume() {
    return this.mopidyClient.playback.getVolume();
  }

  setVolume(volume) {
    return this.mopidyClient.playback.setVolume(volume);
  }

  getTracklist(start, end) {
    return this.mopidyClient.tracklist.slice(start, end);
  }

  getPlaylists(loadTracks = false) {
    return this.mopidyClient.playlists.getPlaylists(loadTracks);
  }

  getPlaylist(uri) {
    return this.mopidyClient.playlists.lookup(uri);
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
