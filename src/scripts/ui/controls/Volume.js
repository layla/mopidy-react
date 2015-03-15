import React from 'react';
import app from '../../bootstrap';

let Volume = React.createClass({
  getInitialState() {
    return {
      volume: this.props.volume
    };
  },

  componentWillMount() {
    this.listenToChanges();
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
    app.get('services.mopidy')
      .then((mopidyService) => {
        mopidyService.setVolume(volume);
      });
  },

  render() {
    return (
      <div>
        <b>CURRENT VOLUME ({this.state.volume} )</b>
        <input value={this.state.volume} onChange={this.setVolume} />
      </div>
    );
  }
});

export default Volume;
