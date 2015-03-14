import React from 'react';
import {Well, Row, Col, Panel} from 'react-bootstrap';
import {State} from 'react-router';
import Sidebar from '../ui/Sidebar';

let Project = React.createClass({
  mixins: [State],

  render() {
    var params = this.getParams();
    return (
      <Row>
        <Col lg={3} md={4} sm={4} xs={5}>
          <Panel bsStyle="primary">
            <Sidebar />
          </Panel>
        </Col>
        <Col lg={9} md={8} sm={8} xs={5}>
          <Well>Play!</Well>
        </Col>
      </Row>
    );
  }
});

export default Project;
