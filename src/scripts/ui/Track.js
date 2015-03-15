import React from 'react';
import _ from 'underscore';
import {Row, Col, Panel} from 'react-bootstrap';

let Track = React.createClass({
  getInitialState() {
    return {
      track: this.props.track
    };
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
      </Panel>
    );
  }
});

export default Track;
