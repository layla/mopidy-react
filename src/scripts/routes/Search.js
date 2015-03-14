var React = require('react');
var {State} = require('react-router');
var {Well, Row, Col, Panel, Input, Glyphicon} = require('react-bootstrap');
var Sidebar = require('../ui/Sidebar');
var app = require('../bootstrap');

var Search = React.createClass({
  mixins: [State],
  
  getInitialState() {
    return {
      results: []
    };
  },

  loadData(query) {
    app.mopidy.then((mopidy) => {
      mopidy.library.search({ any: [query] })
        .then((results) => this.setState({results}));
    });
  },

  search(e) {
    // debounce search
    if (this.timer) {
      clearTimeout(this.timer);
    }

    var query = e.target.value;
    this.timer = setTimeout(() => {
      this.loadData(query);
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
          <Well>
            <pre>{JSON.stringify(this.state.results, undefined, 2)}</pre>
          </Well>
        </Col>
      </Row>
    );
  }
});

export default Search;
