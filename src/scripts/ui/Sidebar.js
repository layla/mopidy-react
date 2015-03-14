var React = require('react');
var _ = require('underscore');
var {State} = require('react-router');
var {Nav, NavItem, Glyphicon} = require('react-bootstrap');
var {NavItemLink} = require('react-router-bootstrap');

var Sidebar = React.createClass({
  mixins: [State],

  render() {
    var params = this.getParams();
    
    return (
      <Nav bsStyle="pills" stacked={true} className="sidebar">
        <NavItemLink to='dashboard'><Glyphicon glyph="home" /></NavItemLink>
        <NavItemLink to='search'>Search</NavItemLink>
        <NavItemLink to='playlist'>Playlist</NavItemLink>
      </Nav>
    );
  }
});

module.exports = Sidebar;
