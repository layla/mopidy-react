'use react';

import React from 'react';
import Router from 'react-router';
let Route = Router.Route;
let DefaultRoute = Router.DefaultRoute;

let routes = (
  <Route name="root" path="/" handler={require('./ui/App')}>
    <Route name="dashboard" path="/" handler={require('./routes/Dashboard')} />
    <Route name="search" path="search" handler={require('./routes/Search')}>
      <Route name="search-results" path="results/:query" handler={require('./routes/SearchResults')} />
      <DefaultRoute name="search-index" handler={require('./routes/SearchResults')} />
    </Route>
    <Route name="playlist" path="playlist" handler={require('./routes/Playlist')} />
  </Route>
);

Router.run(routes, (Handler) => React.render(<Handler />, document.getElementById('app')));
