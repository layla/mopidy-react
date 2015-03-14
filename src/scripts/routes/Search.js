import React from 'react';
import _ from 'underscore';
import {Well, Row, Col, Panel, Input, Glyphicon} from 'react-bootstrap';
import {State} from 'react-router';
import Sidebar from '../ui/Sidebar';
import Tracks from '../ui/Tracks';
import app from '../bootstrap';

let Search = React.createClass({
  mixins: [State],

  getInitialState() {
    return {
      tracks: []
    };
  },

  searchResultsToTracks(searchResults) {
    var tracks = _.reduce(searchResults, (memo, searchResult, index) => {
      return memo.concat(searchResult.tracks || []);
    }, []);
    return tracks;
  },

  loadData(query) {
    this.setState({ loading: true });
    app.get('services.mopidy')
      .then((mopidy) => {
        mopidy.library.search({ any: [query] })
          .then((searchResults) => {
            let tracks = this.searchResultsToTracks(searchResults);
            this.setState({
              tracks: tracks,
              loading: false
            });
          });
      });
  },

  search() {
    var query = this.refs.search.getValue();
    this.loadData(query);
  },

  render() {
    var params = this.getParams();
    return (
      <Row>
        <Col lg={3} md={4} sm={4} xs={12}>
          <Panel bsStyle="primary">
            <Sidebar />
          </Panel>
        </Col>
        <Col lg={9} md={8} sm={8} xs={12}>
          { this.state.loading ? (
            <Well>
              <center>
                <span className="glyphicon glyphicon-refresh spinning" style={{fontSize: 40}}></span><br />
                <br />
                Hang in there, this might take a while...
              </center>
            </Well>
          ) : '' }
          <Input
            ref="search"
            type="search"
            addonAfter={<button className="btn btn-primary" onClick={this.search}><Glyphicon glyph="search" /></button>} />
          <Tracks tracks={this.state.tracks} />
        </Col>
      </Row>
    );
  }
});

export default Search;
