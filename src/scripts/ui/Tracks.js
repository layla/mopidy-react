import React from 'react';
import _ from 'underscore';
import {Well, Row, Col, Panel, Glyphicon} from 'react-bootstrap';
import app from '../bootstrap';

export default React.createClass({
  propTypes: {
    query: React.PropTypes.string
  },

  getInitialState() {
    return {
      loading: false,
      tracks: []
    }
  },

  componentWillMount() {
    this.filters = [
      {
        key: 'provider',
        cb: (item) => true
      }
    ];
  },

  componentDidMount() {
    this.loadData(this.props.query);
  },

  componentWillReceiveProps(nextProps) {
    this.loadData(nextProps.query);
  },

  componentShouldUpdate(nextProps) {
    return this.props.query !== nextProps.query;
  },

  loadData(query) {
    this.setState({
      loading: true
    });

    app.get('services.mopidy')
      .then((mopidy) => {
        return mopidy.search(query);
      })
      .then((tracks) => {
        this.setState({
          tracks: tracks,
          loading: false
        });
      });
  },

  getTracks() {
    return _.filter(this.state.tracks, (track) => {
      let filterResults = _.map(this.filters, (filter) => {
        return filter.cb(track);
      });
      let passes = ! _.contains(filterResults, false);
      return passes;
    });
  },

  addFilter(key, cb) {
    this.filters.push({key, cb});
  },

  removeFilter(key) {
    this.filters = _.filter(this.filters, (filter) => {
      return filter.key !== key;
    });
  },

  filterByProvider(provider) {
    this.removeFilter('provider');
    this.addFilter('provider', function (track) {
      return provider === 'all' || track.uri.split(':')[0] === provider;
    });
    this.forceUpdate();
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
                <th>Artist</th><td>{track.artists ? _.first(track.artists).name : '-'}</td>
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

  render() {
    let tracks = this.getTracks();

    return this.state.loading ? (
      <Well>
        <center>
          <span className="glyphicon glyphicon-refresh spinning" style={{fontSize: 40}}></span><br />
          <br />
          Hang in there, this might take a while...
        </center>
      </Well>
    ) : (
      <div>
        <a onClick={this.filterByProvider.bind(this, 'all')}>all</a> &nbsp; 
        <a onClick={this.filterByProvider.bind(this, 'spotify')}>spotify</a> &nbsp; 
        <a onClick={this.filterByProvider.bind(this, 'youtube')}>youtube</a> &nbsp; 
        <a onClick={this.filterByProvider.bind(this, 'soundcloud')}>soundcloud</a> &nbsp; 
        <a onClick={this.filterByProvider.bind(this, 'gmusic')}>gmusic</a>
        { tracks.length > 0 ? (
        <Well>
          {_.map(tracks, (track) => this.renderTrack(track))}
        </Well>
        ) : '' }
      </div>
    );
  }
});
