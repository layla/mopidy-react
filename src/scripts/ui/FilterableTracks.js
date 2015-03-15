import React from 'react';
import _ from 'underscore';
import {Well, Row, Col, Panel, Glyphicon} from 'react-bootstrap';
import fuzzy from 'fuzzy'
import Tracks from './Tracks';
import app from '../bootstrap';

export default React.createClass({
  propTypes: {
    tracks: React.PropTypes.array,
    search: React.PropTypes.string
  },

  getInitialState() {
    return {
      tracks: this.props.tracks,
      provider: 'all',
      search: null
    }
  },

  componentWillReceiveProps(nextProps) {
    console.log('FilterableTracks.componentWillReceiveProps', nextProps);
    this.setState({
      tracks: nextProps.tracks,
      search: nextProps.search
    });
  },

  shouldComponentUpdate(nextProps, nextState) {
    var shouldUpdate = this.props.search !== nextProps.search ||
      this.state.tracks !== nextProps.tracks ||
      this.state.provider !== nextState.provider;
    console.log('FilterableTracks.shouldComponentUpdate', shouldUpdate);
    return shouldUpdate;
  },

  filterTracks(tracks) {
    let filters = [
      (track) => {
        return this.state.provider === 'all' ||
          this.state.provider === track.uri.split(':')[0];
      },
      (track) => {
        if (this.state.search === null) {
          return true;
        }

        var searchString = [
          'track:' + (track.name ? track.name : '-'),
          'artist:' + (track.artists ? _.first(track.artists).name : '-'),
          'album:' + (track.album ? track.album.name : '-'),
          'date:' + (track.album.date ? track.album.date : '-')
        ].join(' ');
        
        return fuzzy.test(this.state.search, searchString);
      }
    ];

    return _.filter(tracks, (track) => {
      let filterResults = _.map(filters, (filter) => {
        return filter(track);
      });
      console.log('filterResults', filterResults);
      let passes = ! _.contains(filterResults, false);
      return passes;
    });
  },

  filterByProvider(provider) {
    this.setState({
      provider: provider
    });
  },

  render() {
    let filteredTracks = this.filterTracks(this.state.tracks);
    console.log('FilterableTracks.render', filteredTracks.length);
    return (
      <div>
        <span>FILTER</span>
        <ul className="nav nav-pills">
          <li className={this.state.provider === 'all' ? 'active' : ''}><a onClick={this.filterByProvider.bind(this, 'all')}>all</a></li>
          <li className={this.state.provider === 'spotify' ? 'active' : ''}><a onClick={this.filterByProvider.bind(this, 'spotify')}>spotify</a></li>
          <li className={this.state.provider === 'youtube' ? 'active' : ''}><a onClick={this.filterByProvider.bind(this, 'youtube')}>youtube</a></li>
          <li className={this.state.provider === 'soundcloud' ? 'active' : ''}><a onClick={this.filterByProvider.bind(this, 'soundcloud')}>soundcloud</a></li>
          <li className={this.state.provider === 'gmusic' ? 'active' : ''}><a onClick={this.filterByProvider.bind(this, 'gmusic')}>gmusic</a></li>
        </ul>
        <br />
        { filteredTracks.length > 0 ? (
          <Tracks tracks={filteredTracks} />
        ) : (
          <center>
            <b>Your search did not return any results.</b>
            { _.isArray(this.state.tracks) && this.state.tracks.length > 0 ? (
              <div>Hit the search button to start a new search with the query "{ this.state.search }"</div>
            ) : '' }
          </center>
        ) }
      </div>
    );
  }
});
