import React from 'react';
import _ from 'underscore';
import {Nav, Well} from 'react-bootstrap';
import {NavItemLink} from 'react-router-bootstrap';

const PlaylistMenu = React.createClass({

  render() {
    console.log('PlaylistMenu.render', this.props);

    return this.props.loading ? (
      <Well>
        <center>
          <span className="glyphicon glyphicon-refresh spinning" style={{fontSize: 40}}></span><br />
          <br />
          Hang in there, this might take a while...
        </center>
      </Well>
    ) : (
      <Nav bsStyle="pills" stacked={true} className="playlist-menu">
      { _.map(this.props.playlists, (playlist) => {
        return (
          <NavItemLink key={playlist.uri} to='playlist-detail' params={{playlistUri: playlist.uri}}>{playlist.name}</NavItemLink>
        );
      }) }
      </Nav>
    );
  }

});

export default PlaylistMenu;
