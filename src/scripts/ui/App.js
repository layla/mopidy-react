import React from 'react';
import {RouteHandler, Link, State} from 'react-router';
import {Navbar, Nav, NavItem, Glyphicon} from 'react-bootstrap';
import VolumeSlider from './controls/VolumeSlider';
import PlayPause from './controls/PlayPause';
import MuteUnmute from './controls/MuteUnmute';
import Next from './controls/Next';
import Previous from './controls/Previous';
import TrackName from './controls/TrackName';

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
              <PlayPause />
            </NavItem>
            <NavItem>
              <TrackName />
            </NavItem>
            <NavItem>
              <Previous />
            </NavItem>
            <NavItem>
              <Next />
            </NavItem>
            <NavItem>
              <VolumeSlider style={{marginTop: 5}} />
            </NavItem>
            <NavItem>
              <MuteUnmute />
            </NavItem>
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
