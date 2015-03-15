import React from 'react';
import _ from 'underscore';
import {Well, Input, Glyphicon} from 'react-bootstrap';
import {State} from 'react-router';
import {Sidebar, LastSearches, FilterableTracks, SearchBox} from '../ui';
import app from '../bootstrap';

let SearchResults = React.createClass({
  mixins: [State],

  getInitialState() {
    let params = this.getParams();
    return {
      loading: false,
      tracks: [],
      search: params.query
    };
  },

  componentWillReceiveProps() {
    let params = this.getParams();
    console.log('SearchResults.willReceiveProps', params);
    if (params.query) {
      this.loadData(params.query);
    }
  },

  loadData(query) {
    console.log('SearchResults.loadData', query);
    this.setState({
      loading: true
    });

    app.get('services.mopidy')
      .then((mopidy) => {
        return mopidy.search(query);
      })
      .then((tracks) => {
        console.log('SearchResults.loadData', tracks.length);
        this.setState({
          tracks: tracks,
          loading: false
        });
      });
  },

  updateSearch(e) {
    // clear timeout for debounce
    if (this.timer) {
      clearTimeout(this.timer);
    }

    let search = e.target.value;
    this.timer = setTimeout(() => {
      this.setState({
        search: search
      });
    }, 1000);
  },

  render() {
    let params = this.getParams();
    console.log('SearchResults.render', this.state.tracks.length);
    return (
      <Well>
        { this.state.search && this.state.tracks.length > 0 ? 'Fuzzy search in "' + params.query + '" results.' : ''}
        <SearchBox value={this.state.search} onChange={this.updateSearch} />
        { this.state.search ? (
          <div>
            { this.state.search !== params.query ? (
            <div>
              Click the search button to load new results for query "{ this.state.search }"
            </div>
            ) : '' }
          </div>
        ) : (
          <div>
            Start typing a query and hit the search button.
          </div>
        ) }
        <br />
        { this.state.loading ? (
          <Well>
            <center>
              <span className="glyphicon glyphicon-refresh spinning" style={{fontSize: 40}}></span><br />
              <br />
              Hang in there, this might take a while...
            </center>
          </Well>
        ) : (this.state.tracks.length > 0 ? (
          <FilterableTracks tracks={this.state.tracks} search={this.state.search}  />
        ) : '') }
      </Well>
    );
  }
});

export default SearchResults;
