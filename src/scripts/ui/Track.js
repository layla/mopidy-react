import React from 'react';
import _ from 'underscore';
import {Glyphicon, Row, Col, Panel} from 'react-bootstrap';
import app from '../bootstrap';

let Track = React.createClass({
  getInitialState() {
    return {
      track: this.props.track
    };
  },

  componentWillReceiveProps(nextProps) {
    this.setState({ track: nextProps.track });
  },

  play() {
    app.get('services.mopidy')
      .then((mopidyService) => {
        return mopidyService.queueNextAndPlay([this.state.track]);
      });
  },

  queueNext() {
    app.get('services.mopidy')
      .then((mopidyService) => {
        return mopidyService.queueNext([this.state.track]);
      });
  },

  queueLast() {
    app.get('services.mopidy')
      .then((mopidyService) => {
        return mopidyService.queueLast([this.state.track]);
      });
  },

  addToPlaylist() {
    // app.get('services.mopidy')
    //   .then((mopidyService) => {
    //     return mopidyService.addToPlaylist(this.state.track, );
    //   });
  },

  render() {
    let track = this.state.track;
    if ( ! track) {
      return <div />;
    }
    
    let images = track.album ? (track.album.images || []) : [];
    let imageUrl = _.first(_.filter(images, (image) => {
      // filter out trash
      return image !== "";
    }));
    let panelStyle = {
      position: 'relative',
      zIndex: 1
    };
    let bgStyle = {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.4)',
      zIndex: 2
    };
    let provider = track.uri.split(':')[0];
    let providerBsStyleMap = {
      spotify: 'success',
      soundcloud: 'warning',
      youtube: 'danger',
      gmusic: 'info'
    };
    let bsStyle = providerBsStyleMap[provider];
    let providerLogoMap = {
      spotify: 'http://www.brandsoftheworld.com/sites/default/files/styles/logo-thumbnail/public/092014/spotify_2014_0.png',
      soundcloud: 'http://icons.iconarchive.com/icons/danleech/simple/128/soundcloud-icon.png',
      youtube: 'http://media.idownloadblog.com/wp-content/uploads/2014/08/YouTube-2.9-for-iOS-app-icon-small.png',
      gmusic: 'http://media.idownloadblog.com/wp-content/uploads/2014/10/Google-Play-Music-1.5.3184-for-iOS-app-icon-small.png'
    };
    let providerLogo = providerLogoMap[provider];
    let header = (<div><img src={providerLogo} height={20} /> &nbsp; {track.name}</div>);

    return (
      <Panel bsStyle={bsStyle} header={header} style={panelStyle}>
        <Row>
          <Col md={6} sm={12}>
            <img src={imageUrl} style={{minWidth: 150, maxWidth: 300, width: '100%'}} />
          </Col>
          <Col md={6} sm={12}>
            <table className="table table-striped">
              <tr>
                <th>Track no.</th><td>{track.track_no || '-'}</td>
              </tr>
              <tr>
                <th>Artist</th><td>{track.artists ? _.first(track.artists).name : '-'}</td>
              </tr>
              <tr>
                <th>Album</th><td>{track.album ? track.album.name : '-'}</td>
              </tr>
              <tr>
                <th>Date</th><td>{track.date || '-'}</td>
              </tr>
            </table>
          </Col>
        </Row>
        <button className="btn btn-primary" onClick={this.play}>
          <Glyphicon glyph="play" /> <span className="btn-label">PLAY</span>
        </button> &nbsp;
        <button className="btn btn-primary" onClick={this.queueNext}>
          <Glyphicon glyph="arrow-right" /> <span className="btn-label">PLAY NEXT</span>
        </button> &nbsp;
        <button className="btn btn-primary" onClick={this.queueLast}>
          <Glyphicon glyph="time" /> <span className="btn-label">ADD TO QUEUE</span>
        </button> &nbsp;
        <button className="btn btn-primary" onClick={this.addToPlaylist}>
          <Glyphicon glyph="bookmark" /> <span className="btn-label">ADD TO PLAYLIST</span>
        </button>
      </Panel>
    );
  }
});

export default Track;
