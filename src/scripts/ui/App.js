import React from 'react';
import {RouteHandler, Link, State} from 'react-router';
import {Navbar, Glyphicon} from 'react-bootstrap';

let App = React.createClass({
  mixins: [State],

  render() {
    var params = this.getParams();
    var brand = (
      <div>
        <Link to="dashboard"><Glyphicon glyph="home" /> officebox</Link>
      </div>
    );
    return (
      <div>
        <Navbar
          inverse={true}
          brand={brand}
          fluid={true}
          staticTop={true} />
        <div className="container-fluid">
          <RouteHandler {...this.props} />
        </div>
      </div>
    );
  }
});

export default App;
