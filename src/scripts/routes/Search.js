import React from 'react';
import _ from 'underscore';
import {Well, Row, Col, Panel, Input, Glyphicon} from 'react-bootstrap';
import {State, RouteHandler} from 'react-router';
import {Sidebar, LastSearches, Tracks} from '../ui';
import app from '../bootstrap';

let Search = React.createClass({
  mixins: [State],

  getInitialState() {
    return {
      lastSearches: []
    };
  },

  componentDidMount() {
    this.loadData();
    this.listenToChanges();
  },

  loadData() {
    app.get('services.storage')
      .then((storageService) => {
        return storageService.get('lastsearches');
      })
      .then((lastSearches) => {
        this.setState({ lastSearches });
      });
  },

  listenToChanges() {
    var db = app.get('clients.pouchdb');
    db.changes()
      .on('change', (change) => {
        if (change.id === 'lastsearches') {
          this.loadData();
        }
      });
  },

  render() {
    return (
      <Row>
        <Col lg={3} md={4} sm={4} xs={12}>
          <Panel bsStyle="primary" header="Menu">
            <Sidebar />
          </Panel>
          <Panel bsStyle="primary" header="Last 5 searches">
            <LastSearches searches={this.state.lastSearches} />
          </Panel>
        </Col>
        <Col lg={9} md={8} sm={8} xs={12}>
          <RouteHandler />
        </Col>
      </Row>
    );
  }
});

export default Search;
