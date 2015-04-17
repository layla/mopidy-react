import Reflux from 'reflux';

const playlistActions = Reflux.createActions({

  getPlaylists: {
    asyncResult: true,
    children: ['foundInCache']
  },

  getPlaylist: {
    asyncResult: true,
    children: ['foundInCache']
  }

});

export default playlistActions;
