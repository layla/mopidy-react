import React from 'react';
import {RouteHandler, Link, State} from 'react-router';
import {Navbar, Nav, NavItem, Glyphicon} from 'react-bootstrap';

let App = React.createClass({
  requestFullScreen() {
    let el = document.documentElement;
    let rfs = el.requestFullScreen
      || el.webkitRequestFullScreen
      || el.mozRequestFullScreen;
    rfs.call(el);
  },

  render() {
    var brand = (
      <div className="pull-left">
        <Link to="dashboard"><Glyphicon glyph="home" /> officebox</Link>
      </div>
    );
    return (
      <div>
        <Navbar
          inverse={true}
          brand={brand}
          fluid={true}
          staticTop={true}>
          <Nav right>
            <NavItem>
              <Glyphicon glyph="resize-full" style={{color: '#ffffff'}} onClick={this.requestFullScreen} />
            </NavItem>
          </Nav>
        </Navbar>
        <div className="container-fluid">
          <RouteHandler {...this.props} />
        </div>
      </div>
    );
  }
});

export default App;
