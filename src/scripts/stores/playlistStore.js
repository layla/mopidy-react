import Reflux from 'reflux';
import actions from '../actions/playlistActions';
import _ from 'underscore';

export default Reflux.createStore({

  listenables: actions,

  onGetPlaylist() {
    this.trigger({
      loading: true
    });
  },

  onGetPlaylistFoundInCache(playlist) {
    console.log('onGetPlaylistFoundInCache', playlist);
    this.trigger({
      playlist: playlist,
      loading: false
    });
  },

  onGetPlaylistCompleted(playlist) {
    console.log('onGetPlaylistCompleted', playlist);
    this.trigger({
      playlist: playlist,
      loading: false
    });
  }

});
