import React from 'react';
import Reflux from 'reflux';
import app from '../bootstrap';
import {State} from 'react-router';
import {Input, Well} from 'react-bootstrap';
import {FilterableTracks} from '../ui';
import playlistActions from '../actions/playlistActions';
import playlistStore from '../stores/playlistStore';

const PlaylistDetail = React.createClass({
  mixins: [
    State,
    Reflux.connect(playlistStore)
  ],

  statics: {
    willTransitionTo: (transition, params) => {
      playlistActions.getPlaylist(params.playlistUri);
    }
  },

  getInitialState() {
    return {
      search: null,
      loading: true,
      playlist: null
    };
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

  render() {
    console.log('PlaylistDetail.render', this.state);
    if (this.state.loading) {
      return (
        <Well>
          <center>
            <span className="glyphicon glyphicon-refresh spinning" style={{fontSize: 40}}></span><br />
            <br />
            Hang in there, this might take a while...
          </center>
        </Well>
      );
    } else {
      return (
        <div>
          <Input onChange={this.updateSearch} />
          { this.state.playlist ? (
            <FilterableTracks tracks={this.state.playlist.tracks} search={this.state.search} />
          ) : '' }
        </div>
      );
    }
  }
});

export default PlaylistDetail;
