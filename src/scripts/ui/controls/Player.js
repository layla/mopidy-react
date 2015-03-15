import React from 'react';
import {Well} from 'react-bootstrap';
import Volume from './Volume';
import Track from '../Track';
import app from '../../bootstrap';

let Player = React.createClass({
  getInitialState() {
    return {
      loading: true,
      playerData: {}
    };
  },

  componentDidMount() {
    this.loadData();
  },

  loadData() {
    console.log('Player.loadData');
    this.setState({
      loading: true
    });

    app.get('services.mopidy')
      .then((mopidy) => {
        return mopidy.getPlayerData();
      })
      .then((playerData) => {
        console.log('Player.loadData', playerData);
        this.setState({
          playerData: playerData,
          loading: false
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
          <Track track={this.state.playerData.currentTrack} />
          <Volume volume={this.state.playerData.volume} />
        </div>
      ) }
    </div>
    );
  }
});

export default Player;
