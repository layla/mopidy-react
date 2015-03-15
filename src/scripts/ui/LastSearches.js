import React from 'react';
import _ from 'underscore';
import {Nav, Glyphicon} from 'react-bootstrap';
import {NavItemLink} from 'react-router-bootstrap';

let LastSearches = React.createClass({
  render() {
    return (
      <Nav bsStyle="pills" stacked={true} className="sidebar">
        {_.map(this.props.searches, (query) => {
          return (<NavItemLink to='search-results' params={{query: query}}><Glyphicon glyph='search' /> &nbsp; {query}</NavItemLink>);
        })}
      </Nav>
    );
  }
});

export default LastSearches;
