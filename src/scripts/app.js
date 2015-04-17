'use react';

import React from 'react';
import BBPromise from 'bluebird';
import Router from 'react-router';
let Route = Router.Route;
let DefaultRoute = Router.DefaultRoute;
import app from './bootstrap';

let routes = (
  <Route name="root" path="/" handler={require('./ui/App')}>
    <Route name="dashboard" path="/" handler={require('./routes/Dashboard')} />
    <Route name="search" path="search" handler={require('./routes/Search')}>
      <Route name="search-results" path="results/:query" handler={require('./routes/SearchResults')} />
      <DefaultRoute name="search-index" handler={require('./routes/SearchResults')} />
    </Route>
    <Route name="playlists" path="playlists" handler={require('./routes/Playlists')}>
      <Route name="playlist-detail" path="detail/:playlistUri" handler={require('./routes/PlaylistDetail')} />
      <DefaultRoute name="playlist-index" handler={require('./routes/PlaylistIndex')} />
    </Route>
    <Route name="queue" path="queue" handler={require('./routes/Queue')} />
  </Route>
);

console.info('Starting router...');
BBPromise.all(app.setup())
  .then(() => {
    console.info('Mopidy client is ready...');
    Router.run(routes, (Handler) => {
      React.render(<Handler />, document.getElementById('app'));
    });
  });
