'use react';

var React = require('react');

var Router = require('react-router');
var Route = Router.Route;

var routes = (
  <Route name="root" path="/" handler={require('./ui/App')}>
    <Route name="dashboard" path="/" handler={require('./routes/Dashboard')} />
    <Route name="search" path="search" handler={require('./routes/Search')} />
    <Route name="playlist" path="playlist" handler={require('./routes/Playlist')} />
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler />, document.getElementById('app'));
});
