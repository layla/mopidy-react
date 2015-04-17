import Reflux from 'reflux';
import actions from '../actions/playlistActions';

export default Reflux.createStore({

  listenables: actions,

  onGetPlaylists() {
    this.trigger({
      loading: true
    });
  },

  onGetPlaylistsFoundInCache(items) {
    console.log('onGetPlaylistsFoundInCache', items);
    this.trigger({
      items: items,
      loading: false
    });
  },

  onGetPlaylistsCompleted(items) {
    console.log('onGetPlaylistsCompleted', items);
    this.trigger({
      items: items,
      loading: false
    });
  }

});
