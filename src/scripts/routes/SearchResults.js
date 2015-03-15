import React from 'react';
import _ from 'underscore';
import {Well, Input, Glyphicon} from 'react-bootstrap';
import {State} from 'react-router';
import {Sidebar, LastSearches, Tracks, SearchBox} from '../ui';
import app from '../bootstrap';

let SearchResults = React.createClass({
  mixins: [State],

  render() {
    let params = this.getParams();

    return (
      <Well>
        <SearchBox />
        { params.query ? <Tracks query={params.query} /> : '' }
      </Well>
    );
  }
});

export default SearchResults;
