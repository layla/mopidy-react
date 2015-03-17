import React from 'react';
import {State} from 'react-router';
import {Well} from 'react-bootstrap';
import {SearchBox, FilterableTracks} from '../ui';
import app from '../bootstrap';

const PlaylistDetail = React.createClass({
  mixins: [State],

  getInitialState() {
    let params = this.getParams();
    return {
      loading: true,
      search: null,
      playlistUri: params.playlistUri 
    };
  },

  componentWillReceiveProps() {
    let params = this.getParams();
    this.setState({
      playlistUri: params.playlistUri
    });
    this.loadData();
  },

  componentWillMount() {
    this.loadData();
  },

  loadData() {
    this.setState({ loading: true });
    app.get('services.mopidy')
      .then((mopidyService) => {
        return mopidyService.getPlaylist(this.state.playlistUri);
      })
      .then((playlist) => {
        this.setState({
          playlist: playlist,
          loading: false
        });
      });
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

  render() {
    let playlist = this.state.playlist;
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
        <SearchBox onChange={this.updateSearch} />
        { playlist ? (
          <FilterableTracks tracks={playlist.tracks} search={this.state.search} />
        ) : '' }
      </div>
    );
  }
});

export default PlaylistDetail;
