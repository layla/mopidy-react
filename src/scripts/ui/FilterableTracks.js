import React from 'react';
import _ from 'underscore';
import {Well, Row, Col, Panel, Input, Glyphicon, OverlayTrigger, Tooltip, ButtonToolbar, ButtonGroup, Button} from 'react-bootstrap';
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
      searchMode: 'normal',
      provider: 'all',
      search: '',
      searchPrefix: ''
    };
  },

  componentWillReceiveProps(nextProps) {
    console.log('FilterableTracks.componentWillReceiveProps', nextProps);
    this.setState(nextProps);
  },

  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  },

  updateSearch(e) {
    // clear timeout for debounce
    if (this.timer) {
      clearTimeout(this.timer);
    }

    let search = e.target.value;
    this.timer = setTimeout(() => {
      this.setState({
        search: search
      });
    }, 1000);
  },

  filterTracks(tracks) {
    console.log('FilterableTracks.filterTracks');
    return _.filter(tracks, (track) => {
      let providerCheck = this.state.provider === 'all' ||
        this.state.provider === track.uri.split(':')[0];

      let searchCheck;
      if (this.state.search === '' || this.state.search === null) {
        searchCheck = true;
      } else {
        let matchString = [
          'track:' + (track.name ? track.name : '-'),
          'artist:' + (track.artists ? _.first(track.artists).name : '-'),
          'album:' + (track.album ? track.album.name : '-'),
          'date:' + (track.album ? track.album.date : '-')
        ].join('#');
        let searchString = this.state.searchPrefix + this.state.search;
        if (this.state.searchMode === 'fuzzy') {
          searchCheck = fuzzy.test(searchString, matchString);
        } else if (this.state.searchMode === 'strict') {
          searchCheck = matchString.toLowerCase().indexOf(searchString.toLowerCase() + '#') !== -1;
        } else {
          searchCheck = matchString.toLowerCase().indexOf(searchString.toLowerCase()) !== -1;
        }
      }
      return providerCheck && searchCheck;
    });
  },

  setProvider(provider) {
    this.setState({
      provider: provider
    });
  },

  setSearchPrefix(searchPrefix) {
    this.setState({
      searchPrefix: searchPrefix
    });
  },

  setSearchMode(mode) {
    this.setState({
      searchMode: mode
    });
  },

  render() {
    let filteredTracks = this.filterTracks(this.props.tracks);
    console.log('FilterableTracks.render', filteredTracks.length);
    return (
      <div>
        <h3>SEARCH IN RESULTS</h3>
        <Input type="search" ref="search" onChange={this.updateSearch} addonBefore={<Glyphicon glyph="search" />} />
        <Row>
          <Col sm={4}>
            <b>SEARCH MODE</b>
            <ButtonToolbar>
              <ButtonGroup bsSize="small">
                <OverlayTrigger placement="bottom" overlay={<Tooltip>Checks if the search exists anywhere within the track details (or search field if given)</Tooltip>}>
                  <Button active={this.state.searchMode === 'normal'} onClick={this.setSearchMode.bind(this, 'normal')}>normal</Button>
                </OverlayTrigger>
                <OverlayTrigger placement="bottom" overlay={<Tooltip>Checks if the search exists completely in the track details (or search field if given)</Tooltip>}>
                  <Button active={this.state.searchMode === 'strict'} onClick={this.setSearchMode.bind(this, 'strict')}>strict</Button>
                </OverlayTrigger>
                <OverlayTrigger placement="bottom" overlay={<Tooltip>Fuzzy searches the track details (or search field if given)</Tooltip>}>
                  <Button active={this.state.searchMode === 'fuzzy'} onClick={this.setSearchMode.bind(this, 'fuzzy')}>fuzzy</Button>
                </OverlayTrigger>
              </ButtonGroup>
            </ButtonToolbar>
          </Col>
          <Col sm={4}>
            <b>SEARCH FIELD</b>
            <ButtonToolbar>
              <ButtonGroup bsSize="small">
                <OverlayTrigger placement="bottom" overlay={<Tooltip>Searches in all fields of the track</Tooltip>}>
                  <Button active={this.state.searchPrefix === ''} onClick={this.setSearchPrefix.bind(this, '')}>all</Button>
                </OverlayTrigger>
                <OverlayTrigger placement="bottom" overlay={<Tooltip>Search in the name of the track only</Tooltip>}>
                  <Button active={this.state.searchPrefix === 'track:'} onClick={this.setSearchPrefix.bind(this, 'track:')}>track</Button>
                </OverlayTrigger>
                <OverlayTrigger placement="bottom" overlay={<Tooltip>Search in the artist field only</Tooltip>}>
                  <Button active={this.state.searchPrefix === 'artist:'} onClick={this.setSearchPrefix.bind(this, 'artist:')}>artist</Button>
                </OverlayTrigger>
                <OverlayTrigger placement="bottom" overlay={<Tooltip>Search in the album field only</Tooltip>}>
                  <Button active={this.state.searchPrefix === 'album:'} onClick={this.setSearchPrefix.bind(this, 'album:')}>album</Button>
                </OverlayTrigger>
                <OverlayTrigger placement="bottom" overlay={<Tooltip>Search in the date field only</Tooltip>}>
                  <Button active={this.state.searchPrefix === 'date:'} onClick={this.setSearchPrefix.bind(this, 'date:')}>date</Button>
                </OverlayTrigger>
              </ButtonGroup>
            </ButtonToolbar>
          </Col>
          <Col sm={4}>
            <b>FILTER PROVIDER</b>
            <ButtonToolbar>
              <ButtonGroup bsSize="small">
                <OverlayTrigger placement="bottom" overlay={<Tooltip>Show results from all providers</Tooltip>}>
                  <Button active={this.state.provider === 'all'} onClick={this.setProvider.bind(this, 'all')}>all</Button>
                </OverlayTrigger>
                <OverlayTrigger placement="bottom" overlay={<Tooltip>Show results from spotify only</Tooltip>}>
                  <Button active={this.state.provider === 'spotify'} onClick={this.setProvider.bind(this, 'spotify')}>spotify</Button>
                </OverlayTrigger>
                <OverlayTrigger placement="bottom" overlay={<Tooltip>Show results from youtube only</Tooltip>}>
                  <Button active={this.state.provider === 'youtube'} onClick={this.setProvider.bind(this, 'youtube')}>youtube</Button>
                </OverlayTrigger>
                <OverlayTrigger placement="bottom" overlay={<Tooltip>Show results from soundcloud only</Tooltip>}>
                  <Button active={this.state.provider === 'soundcloud'} onClick={this.setProvider.bind(this, 'soundcloud')}>soundcloud</Button>
                </OverlayTrigger>
                <OverlayTrigger placement="bottom" overlay={<Tooltip>Show results from gmusic only</Tooltip>}>
                  <Button active={this.state.provider === 'gmusic'} onClick={this.setProvider.bind(this, 'gmusic')}>gmusic</Button>
                </OverlayTrigger>
                <OverlayTrigger placement="bottom" overlay={<Tooltip>Show results from your local library only</Tooltip>}>
                  <Button active={this.state.provider === 'local'} onClick={this.setProvider.bind(this, 'local')}>local</Button>
                </OverlayTrigger>
              </ButtonGroup>
            </ButtonToolbar>
          </Col>
        </Row>
        <br />
        { filteredTracks.length > 0 ? (
          <div>
            <b>Showing {filteredTracks.length} matches in {this.props.tracks.length} tracks.</b>
            <Tracks tracks={filteredTracks} />
          </div>
        ) : (
          <center>
            <b>Your search / filter combination did not return any results.</b>
          </center>
        ) }
      </div>
    );
  }
});
