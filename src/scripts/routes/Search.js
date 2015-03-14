var React = require('react');
var {Well, Row, Col, Panel, Input, Glyphicon} = require('react-bootstrap');
var {State} = require('react-router');
var Sidebar = require('../ui/Sidebar');

var Project = React.createClass({
  mixins: [State],
  
  search(e) {
    if (this.timer) {
      clearTimeout(this.timer);
    }

    var value = e.target.value;
    this.timer = setTimeout(() => {
      console.log('searching', value);
    }, 1000);
  },

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
          <Input
            type="search"
            addonBefore={<Glyphicon glyph="search" />}
            onChange={this.search} />
          <Well>Search!</Well>
        </Col>
      </Row>
    );
  }
});

module.exports = Project;
