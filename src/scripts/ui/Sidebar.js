import React from 'react';
import _ from 'underscore';
import {State} from 'react-router';
import {Nav, NavItem, Glyphicon} from 'react-bootstrap';
import {NavItemLink} from 'react-router-bootstrap';

let Sidebar = React.createClass({
  mixins: [State],

  render() {
    var params = this.getParams();

    return (
      <Nav bsStyle="pills" stacked={true} className="sidebar">
        <NavItemLink to='dashboard'><Glyphicon glyph="home" /> Now playing</NavItemLink>
        <NavItemLink to='search'><Glyphicon glyph="search" /> Search</NavItemLink>
        <NavItemLink to='queue'><Glyphicon glyph="time" /> Queue</NavItemLink>
        <NavItemLink to='playlists'><Glyphicon glyph="bookmark" /> Playlists</NavItemLink>
      </Nav>
    );
  }
});

export default Sidebar;
