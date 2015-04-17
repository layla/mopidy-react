import _ from 'underscore';
import playlistActions from '../actions/playlistActions';

let cache = {
  playlists: null,
  playlist: {}
};

export default {
  attachKey: 'handlers.playlist',

  setup: (app) => {
    console.info('Setting up playlist handlers');

    playlistActions.getPlaylist.listen((uri) => {
      if (cache.playlist[uri]) {
        playlistActions.getPlaylist.foundInCache(cache.playlist[uri]);
      } else {
        app.get('services.mopidy')
          .then((mopidyService) => {
            let promise = mopidyService.getPlaylist(uri)
              .then((playlist) => {
                cache.playlist[playlist.uri] = playlist;
                return playlist;
              });
            playlistActions.getPlaylist.promise(promise);
          });
      }
    });

    playlistActions.getPlaylists.listen(() => {
      if (cache.playlists) {
        playlistActions.getPlaylists.foundInCache(cache.playlists);
      } else {
        app.get('services.mopidy')
          .then((mopidyService) => {
            let promise = mopidyService.getPlaylists()
              .then((items) => {
                cache.playlists = items;
                return items;
              });
            playlistActions.getPlaylists.promise(promise);
          });
      }
    });
  }
};
