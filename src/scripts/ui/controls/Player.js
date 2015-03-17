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

let Player = React.createClass({
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
    console.log('Player.loadData');
    this.setState({
      loading: true
    });

    app.get('services.mopidy')
      .then((mopidy) => {
        return mopidy.getCurrentTrack();
      })
      .then((currentTrack) => {
        console.log('Player.loadData', currentTrack);
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
          console.log('Player.onTrackPlaybackEnded');
          this.setState({ currentTrack: e.tl_track.track });
        });
        mopidyClient.on('event:trackPlaybackStarted', (e) => {
          let currentTrack = e.tl_track.track;
          console.log('Player.onTrackPlaybackStarted', currentTrack);
          this.setState({ currentTrack });
        });
      });
  },

  render() {
    return (
    <div>
      { this.state.loading ? (
        <Well>
          <center>
            <span className="glyphicon glyphicon-refresh spinning" style={{fontSize: 40}}></span><br />
            <br />
            Loading player data...
          </center>
        </Well>
      ) : (
        <div>
          <Track track={this.state.currentTrack} />
          <PlaybackSlider track={this.state.currentTrack} />
          <br />
          <Row>
            <Col sm={6}>
              <Previous />
              <PlayPause />
              <Next />
            </Col>
            <Col sm={6}>
              <MuteUnmute />
              <div style={{float: 'right', width: '70%', marginTop: 10}}>
                <VolumeSlider />
              </div>
            </Col>
          </Row>
        </div>
      ) }
    </div>
    );
  }
});

export default Player;
