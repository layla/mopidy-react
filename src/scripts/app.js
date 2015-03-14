'use react';

import React from 'react';
import Router from 'react-router';
let Route = Router.Route;

let routes = (
  <Route name="root" path="/" handler={require('./ui/App')}>
    <Route name="dashboard" path="/" handler={require('./routes/Dashboard')} />
    <Route name="search" path="search" handler={require('./routes/Search')} />
    <Route name="playlist" path="playlist" handler={require('./routes/Playlist')} />
  </Route>
);

Router.run(routes, (Handler) => React.render(<Handler />, document.getElementById('app')));
