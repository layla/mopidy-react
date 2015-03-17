import React from 'react';
import {Glyphicon} from 'react-bootstrap';
import app from '../../bootstrap';

let MuteUnmute = React.createClass({
  getInitialState() {
    return {
      isMuted: true
    };
  },

  componentWillMount() {
    this.loadData();
    this.listenToChanges();
  },

  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  },

  loadData() {
    app.get('services.mopidy')
      .then((mopidyService) => {
        return mopidyService.getMute();
      })
      .then((isMuted) => {
        this.setState({ isMuted });
      });
  },

  listenToChanges() {
    app.get('clients.mopidy')
      .then((mopidyClient) => {
        mopidyClient.on('event:muteChanged', (result) => {
          let isMuted = result.mute;
          this.setState({ isMuted });
        });
      });
  },

  toggleMute(e) {
    let shouldBeMuted = !this.state.isMuted;

    this.setState({
      isMuted: shouldBeMuted
    });
    
    app.get('services.mopidy')
      .then((mopidyService) => {
        mopidyService.setMute(shouldBeMuted);
      });
  },

  render() {
    return (
      <button
        className="btn btn-primary"
        onClick={this.toggleMute}>
        <Glyphicon glyph={ this.state.isMuted ? 'volume-off' : 'volume-up' } />
      </button>
    );
  }
});

export default MuteUnmute;
