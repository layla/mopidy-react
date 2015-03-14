import React from 'react';
import _ from 'underscore';
import {Well, Row, Col, Panel, Glyphicon} from 'react-bootstrap';

export default React.createClass({
  getInitialState() {
    return {
      filters: []
    }
  },

  getTracks() {
    var tracks;
    while ( this.state.filters.length > 0 ) {
      tracks = _.filter(this.props.tracks, this.state.filters.pop().cb);
    }
    return tracks;
  },

  addFilter(key, cb) {
    var filters = this.state.filters;
    filters.push({key, cb});
    this.setState({ filters });
  },

  removeFilter(key) {
    var newFilters = _.filter(this.state.filters, (filter) => {
      return filter.key !== key;
    });
    this.setState({
      filters: newFilters
    });
  },

  renderTrack(track) {
    let images = track.album ? (track.album.images || []) : [];
    let imageUrl = _.first(_.filter(images, (image) => {
      // filter out trash
      return image !== "";
    }));
    let panelStyle = {
      position: 'relative',
      zIndex: 1
    };
    let bgStyle = {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.4)',
      zIndex: 2
    };

    return (
      <Panel bsStyle="primary" header={track.name} style={panelStyle}>
        <Row>
          <Col md={6} sm={12}>
            <img src={imageUrl} style={{minWidth: 150, maxWidth: 300, width: '100%'}} />
          </Col>
          <Col md={6} sm={12}>
            <table className="table table-striped">
              <tr>
                <th>Track no.</th><td>{track.track_no}</td>
              </tr>
              <tr>
                <th>Artist</th><td>{_.first(track.artists).name}</td>
              </tr>
              <tr>
                <th>Album</th><td>{track.album.name}</td>
              </tr>
              <tr>
                <th>Date</th><td>{track.date}</td>
              </tr>
            </table>
          </Col>
        </Row>
      </Panel>
    );
  },

  filterProvider(provider) {
    this.removeFilter('provider');
    this.addFilter('provider', function (track) {
      return track.uri.split(':')[0] === provider;
    });
  },

  render() {
    return (
      <div>
        <a onClick={this.filterProvider.bind(this, 'spotify')}>spotify</a>
        <a onClick={this.filterProvider.bind(this, 'youtube')}>youtube</a>
        <a onClick={this.filterProvider.bind(this, 'soundcloud')}>soundcloud</a>
        <Well>
          {_.map(this.getTracks(), (track) => this.renderTrack(track))}
        </Well>
      </div>
    );
  }
});
