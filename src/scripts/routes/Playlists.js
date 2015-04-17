import React from 'react';
import {connect} from 'reflux';
import {Row, Col, Panel} from 'react-bootstrap';
import {RouteHandler} from 'react-router';
import {Sidebar, PlaylistMenu} from '../ui';
import playlistActions from '../actions/playlistActions';
import playlistCollectionStore from '../stores/playlistCollectionStore';

const Playlists = React.createClass({
  mixins: [
    connect(playlistCollectionStore)
  ],

  statics: {
    willTransitionTo: () => {
      playlistActions.getPlaylists();
    }
  },

  render() {
    console.log('Playlists.render', this.state);
    return (
      <Row>
        <Col lg={3} md={4} sm={4} xs={12}>
          <Panel bsStyle="primary" header="Menu">
            <Sidebar />
          </Panel>
          <Panel bsStyle="primary" header="Playlists">
            <PlaylistMenu playlists={this.state.items} loading={this.state.loading} />
          </Panel>
        </Col>
        <Col lg={9} md={8} sm={8} xs={12}>
          <RouteHandler />
        </Col>
      </Row>
    );
  }
});

export default Playlists;
