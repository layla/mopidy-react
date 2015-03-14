import React from 'react';
import {RouteHandler, Link, State} from 'react-router';
import {Navbar, Glyphicon} from 'react-bootstrap';

let App = React.createClass({
  mixins: [State],

  render() {
    var params = this.getParams();
    var brand = (
      <div>
        <Link to="dashboard"><Glyphicon glyph="home" /> mopidy</Link>
      </div>
    );
    return (
      <div className="container-fluid">
        <Navbar
          inverse={true}
          brand={brand}
          fluid={true} />
        <RouteHandler {...this.props} />
      </div>
    );
  }
});

export default App;
