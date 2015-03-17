import React from 'react';
import {Glyphicon} from 'react-bootstrap';
import app from '../../bootstrap';

let PlayPause = React.createClass({
  getInitialState() {
    return {
      isPlaying: false
    };
  },

  componentWillMount() {
    this.loadData();
    this.listenToChanges();
  },

  loadData() {
    app.get('services.mopidy')
      .then((mopidyService) => {
        return mopidyService.getState();
      })
      .then((state) => {
        let isPlaying = state === 'playing';
        this.setState({ isPlaying });
      });
  },

  listenToChanges() {
    app.get('clients.mopidy')
      .then((mopidyClient) => {
        mopidyClient.on('event:playbackStateChanged', (result) => {
          let isPlaying = result.new_state === 'playing';
          this.setState({ isPlaying });
        });
      });
  },

  toggleState(e) {
    let shouldBePlaying = ! this.state.isPlaying;

    this.setState({
      isPlaying: shouldBePlaying
    });
    
    app.get('services.mopidy')
      .then((mopidyService) => {
        if (shouldBePlaying) {
          mopidyService.play();
        } else {
          mopidyService.pause();
        }
      });
  },

  render() {
    return (
      <button
        className="btn btn-primary"
        onClick={this.toggleState}>
        <Glyphicon glyph={ this.state.isPlaying ? 'pause' : 'play' } />
      </button>
    );
  }
});

export default PlayPause;
