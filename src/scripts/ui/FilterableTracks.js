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
      search: null,
      searchPrefix: ''
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
      this.state.provider !== nextState.provider ||
      this.state.searchPrefix !== nextProps.searchPrefix;
    console.log('FilterableTracks.shouldComponentUpdate', shouldUpdate);
    return shouldUpdate;
  },

  filterTracks(tracks) {
    console.log('FilterableTracks.filterTracks');
    return _.filter(tracks, (track) => {
      let providerCheck = this.state.provider === 'all' ||
        this.state.provider === track.uri.split(':')[0];

      let searchCheck;
      if (this.state.search === null) {
        searchCheck = true;
      } else {
        let haystack = [
          'track:' + (track.name ? track.name : '-'),
          'artist:' + (track.artists ? _.first(track.artists).name : '-'),
          'album:' + (track.album ? track.album.name : '-'),
          'date:' + (track.album ? track.album.date : '-')
        ].join(' ');
        
        let searchString = this.state.searchPrefix + this.state.search;
        console.log('searching', searchString);
        searchCheck = fuzzy.test(searchString, haystack);
      }
      
      return providerCheck && searchCheck;
    });
  },

  filterProvider(provider) {
    this.setState({
      provider: provider
    });
  },

  filterSearch(searchPrefix) {
    this.setState({
      searchPrefix: searchPrefix
    });
  },

  render() {
    let filteredTracks = this.filterTracks(this.state.tracks);
    console.log('FilterableTracks.render', filteredTracks.length);
    return (
      <div>
        <b>FILTER PROVIDER</b>
        <ul className="nav nav-pills">
          <li className={this.state.provider === 'all' ? 'active' : ''}><a onClick={this.filterProvider.bind(this, 'all')}>all</a></li>
          <li className={this.state.provider === 'spotify' ? 'active' : ''}><a onClick={this.filterProvider.bind(this, 'spotify')}>spotify</a></li>
          <li className={this.state.provider === 'youtube' ? 'active' : ''}><a onClick={this.filterProvider.bind(this, 'youtube')}>youtube</a></li>
          <li className={this.state.provider === 'soundcloud' ? 'active' : ''}><a onClick={this.filterProvider.bind(this, 'soundcloud')}>soundcloud</a></li>
          <li className={this.state.provider === 'gmusic' ? 'active' : ''}><a onClick={this.filterProvider.bind(this, 'gmusic')}>gmusic</a></li>
        </ul>
        <br />
        <b>FILTER FUZZY SEARCH</b>
        <ul className="nav nav-pills">
          <li className={this.state.searchPrefix === '' ? 'active' : ''}><a onClick={this.filterSearch.bind(this, '')}>all</a></li>
          <li className={this.state.searchPrefix === 'track:' ? 'active' : ''}><a onClick={this.filterSearch.bind(this, 'track:')}>track</a></li>
          <li className={this.state.searchPrefix === 'artist:' ? 'active' : ''}><a onClick={this.filterSearch.bind(this, 'artist:')}>artist</a></li>
          <li className={this.state.searchPrefix === 'album:' ? 'active' : ''}><a onClick={this.filterSearch.bind(this, 'album:')}>album</a></li>
          <li className={this.state.searchPrefix === 'date:' ? 'active' : ''}><a onClick={this.filterSearch.bind(this, 'date:')}>date</a></li>
        </ul>
        <br />
        { filteredTracks.length > 0 ? (
          <Tracks tracks={filteredTracks} />
        ) : (
          <center>
            <b>Your search / filter combination did not return any results.</b>
          </center>
        ) }
      </div>
    );
  }
});
