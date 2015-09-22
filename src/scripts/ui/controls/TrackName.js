import React from 'react';
import {Well, Row, Col} from 'react-bootstrap';
import VolumeSlider from './VolumeSlider';
import PlaybackSlider from './PlaybackSlider';
import MuteUnmute from './MuteUnmute';
import PlayPause from './PlayPause';
import Previous from './Previous';
import Next from './Next';
import Track from '../Track';
import app from '../../bootstrap';

let TrackName = React.createClass({
  getInitialState() {
    return {
      loading: true,
      currentTrack: {}
    };
  },

  componentDidMount() {
    this.loadData();
    this.listenToChanges();
  },

  loadData() {
    console.log('TrackName.loadData');
    this.setState({
      loading: true
    });

    app.get('services.mopidy')
      .then((mopidy) => {
        return mopidy.getCurrentTrack();
      })
      .then((currentTrack) => {
        console.log('TrackName.loadData', currentTrack);
        this.setState({
          currentTrack: currentTrack,
          loading: false
        });
      });
  },

  listenToChanges() {
    app.get('clients.mopidy')
      .then((mopidyClient) => {
        mopidyClient.on('event:trackPlaybackEnded', (e) => {
          console.log('TrackName.onTrackPlaybackEnded');
          this.setState({ currentTrack: e.tl_track.track, loading: false });
        });
        mopidyClient.on('event:trackPlaybackStarted', (e) => {
          let currentTrack = e.tl_track.track;
          console.log('TrackName.onTrackPlaybackStarted', currentTrack);
          this.setState({ currentTrack, loading: false });
        });
      });
  },

  render() {
    var track = this.state.currentTrack;
    return (
      <div className="track-name">
        { this.state.loading ? (
          <span>No track info...</span>
        ) : (
          <marquee scrollamount={2}>
            <span><b>Track:</b> {track.name}</span> &nbsp;&nbsp;
            { track.artists && track.artists.length > 0 ? (<span><b>Artist:</b> {track.artists ? _.first(track.artists).name : '-'} &nbsp;&nbsp;</span>) : null }
            <span><b>Album:</b> {track.album ? track.album.name : '-'} &nbsp;&nbsp;</span>
          </marquee>
        ) }
      </div>
    );
  }
});

export default TrackName;
