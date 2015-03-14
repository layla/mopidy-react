var React = require('react');
var {RouteHandler, Link, State} = require('react-router');
var {Navbar, Glyphicon} = require('react-bootstrap');

var App = React.createClass({
  mixins: [State],

  render() {
    var params = this.getParams();
    var brand = (
      <div>
        <Link to="dashboard"><Glyphicon glyph="home" /> mopidy</Link>
      </div>
    );
    return (
      <div className="container-fluid">
        <Navbar
          inverse={true}
          brand={brand}
          fluid={true} />
        <RouteHandler {...this.props} />
      </div>
    );
  }
});

module.exports = App;
