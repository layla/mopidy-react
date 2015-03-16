import React from 'react';
import _ from 'underscore';
import {Well, Row, Col, Panel} from 'react-bootstrap';
import {State} from 'react-router';
import {Sidebar, Tracks} from '../ui';
import app from '../bootstrap';

let Playlist = React.createClass({
  mixins: [State],

  getInitialState() {
    return {
      tracks: []
    };
  },

  componentWillMount() {
    app.get('services.mopidy')
      .then((mopidyService) => {
        console.log('mopidyService', mopidyService);
        return mopidyService.getTracklist(0, 50);
      })
      .then((tlTracks) => {
        console.log('tlTracks', tlTracks);
        let tracks = _.map(tlTracks, (tlTrack) => {
          return tlTrack.track;
        });
        this.setState({ tracks });
      });
  },

  render() {
    var params = this.getParams();
    return (
      <Row>
        <Col lg={3} md={4} sm={4} xs={12}>
          <Panel bsStyle="primary" header="Menu">
            <Sidebar />
          </Panel>
        </Col>
        <Col lg={9} md={8} sm={8} xs={12}>
          <Well>
            <Tracks tracks={this.state.tracks} />
          </Well>
        </Col>
      </Row>
    );
  }
});

export default Playlist;
