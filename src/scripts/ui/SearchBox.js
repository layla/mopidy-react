import React from 'react';
import {State, Navigation} from 'react-router';
import {Input, Glyphicon} from 'react-bootstrap';

let SearchBox = React.createClass({
  mixins: [State, Navigation],

  search() {
    var query = this.refs.search.getValue();
    this.transitionTo('search-results', { query });
  },

  render() {
    var params = this.getParams();

    return (
      <Input
        ref="search"
        type="search"
        value={this.props.value || (params.query || '')}
        onChange={this.props.onChange || noop}
        addonAfter={<button className="btn btn-primary" onClick={this.search}><Glyphicon glyph="search" /></button>} />
    );
  }
});

export default SearchBox;
