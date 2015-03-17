import React from 'react';
import app from '../../bootstrap';

let VolumeSlider = React.createClass({
  getInitialState() {
    return {
      volume: 0
    };
  },

  componentWillMount() {
    this.loadData();
    this.listenToChanges();
  },

  loadData() {
    app.get('services.mopidy')
      .then((mopidyService) => {
        return mopidyService.getVolume();
      })
      .then((volume) => {
        this.setState({ volume });
      });
  },

  listenToChanges() {
    app.get('clients.mopidy')
      .then((mopidyClient) => {
        mopidyClient.on('event:volumeChanged', (result) => {
          let volume = result.volume;
          this.setState({ volume });
        });
      });
  },

  setVolume(e) {
    let volume = Number(e.target.value);

    this.setState({ volume });

    // debouce setVolume
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => {
      app.get('services.mopidy')
        .then((mopidyService) => {
          mopidyService.setVolume(volume);
        });
    }, 700);
  },

  render() {
    return (
      <input
        type="range"
        min={0}
        max={100}
        value={Number(this.state.volume)}
        onChange={this.setVolume} />
    );
  }
});

export default VolumeSlider;
