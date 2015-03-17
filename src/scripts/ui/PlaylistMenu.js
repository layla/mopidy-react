import React from 'react';
import _ from 'underscore';
import {State} from 'react-router';
import {Nav} from 'react-bootstrap';
import {NavItemLink} from 'react-router-bootstrap';

const PlaylistMenu = React.createClass({
  mixins: [State],

  getInitialState() {
    return {
      playlists: this.props.playlists || []
    };
  },

  componentWillReceiveProps(nextProps) {
    this.setState({
      playlists: nextProps.playlists
    });
  },

  render() {   
    return (
      <Nav bsStyle="pills" stacked={true} className="playlist-menu">
      { _.map(this.state.playlists, (playlist) => {
        return (
          <NavItemLink to='playlist-detail' params={{playlistUri: playlist.uri}}>{playlist.name}</NavItemLink>
        );
      }) }
      </Nav>
    );
  }

});

export default PlaylistMenu;
