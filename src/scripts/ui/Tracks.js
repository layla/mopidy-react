import React from 'react';
import _ from 'underscore';
import {Glyphicon, OverlayTrigger, Tooltip, ButtonToolbar, ButtonGroup, Button} from 'react-bootstrap';
import Track from './Track';

export default React.createClass({
  propTypes: {
    tracks: React.PropTypes.array
  },

  getInitialState() {
    return {
      tracks: this.props.tracks || []
    }
  },

  shouldComponentUpdate(nextProps) {
    let shouldUpdate = this.state.tracks !== nextProps.tracks;
    console.log('Tracks.shouldComponentUpdate', shouldUpdate);
    return shouldUpdate;
  },

  componentWillReceiveProps(nextProps) {
    console.log('Tracks.componentWillReceiveProps', nextProps);
    this.setState({
      tracks: nextProps.tracks
    });
  },

  render() {
    return (
      <div>
        { this.state.tracks && this.state.tracks.length > 0 ? (
          _.map(this.state.tracks, (track) => <Track key={track.tlid || track.uri} track={track} />)
        ) : '' }
      </div>
    );
  }
});
