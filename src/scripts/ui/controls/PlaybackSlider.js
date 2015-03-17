import React from 'react';
import moment from 'moment';
import BBPromise from 'bluebird';
import app from '../../bootstrap';

let PlaybackSlider = React.createClass({
  getInitialState() {
    return {
      timePosition: 0
    };
  },

  componentWillMount() {
    this.loadData();
    this.listenToChanges();
  },

  componentWillUnmount() {
    this.stopCounting();
  },

  loadData() {
    app.get('services.mopidy')
      .then((mopidyService) => {
        return BBPromise.join(
          mopidyService.getTimePosition(),
          mopidyService.getState()
        );
      })
      .spread((timePosition, state) => {
        let isPlaying = state === 'playing';
        this.setState({ timePosition, isPlaying });
      });
  },

  startCounting() {
    this.stopCounting();
    this.timer = setInterval(() => {
      this.setState({ timePosition: this.state.timePosition + 1000 });
    }, 1000);
  },

  stopCounting() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  },

  listenToChanges() {
    app.get('clients.mopidy')
      .then((mopidyClient) => {
        mopidyClient.on('event:seeked', (result) => {
          let timePosition = result.time_position;
          this.setState({ timePosition });
        });

        mopidyClient.on('event:trackPlaybackStarted', (result) => {
          this.setState({
            isPlaying: true,
            timePosition: 0
          });
        });

        mopidyClient.on('event:trackPlaybackEnded', (result) => {
          this.setState({
            isPlaying: false,
            timePosition: result.time_position
          });
        });
        
        mopidyClient.on('event:trackPlaybackPaused', (result) => {
          this.setState({
            isPlaying: false,
            timePosition: result.time_position
          });
        });

        mopidyClient.on('event:trackPlaybackResumed', (result) => {
          this.setState({
            isPlaying: true,
            timePosition: result.time_position
          });
        });
      });
  },

  seek(e) {
    let timePosition = Number(e.target.value);
    console.log('seek', timePosition);
    this.setState({ timePosition });

    // debouce seek
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
    this.debounceTimer = setTimeout(() => {
      app.get('services.mopidy')
        .then((mopidyService) => {
          mopidyService.seek(timePosition);
        });
    }, 700);
  },

  render() {
    if (this.state.isPlaying) {
      this.startCounting();
    } else {
      this.stopCounting();
    }

    let duration = moment.duration(this.state.timePosition);
    let pad2 = (number) => ('0' + number).slice(-2);
    return (
      <div>
        <b>{pad2(duration.hours())}:{pad2(duration.minutes())}:{pad2(duration.seconds())}</b>
        <input
          type="range"
          min={0}
          max={this.props.track ? this.props.track.length : 0}
          value={Number(this.state.timePosition)}
          onChange={this.seek} />
      </div>
    );
  }
});

export default PlaybackSlider;
