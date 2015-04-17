import React from 'react';
import _ from 'underscore';
import {Well, Input, Glyphicon} from 'react-bootstrap';
import {State, Navigation} from 'react-router';
import {Sidebar, LastSearches, FilterableTracks} from '../ui';
import app from '../bootstrap';

const SearchResults = React.createClass({
  mixins: [State, Navigation],

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

  search() {
    let query = this.refs.search.getValue();
    this.transitionTo('search-results', { query });
  },

  render() {
    console.log('SearchResults.render', this.state.tracks.length);
    let searchButton = <button className="btn btn-primary" onClick={this.search}><Glyphicon glyph="search" /></button>;
    // let params = this.getParams();
    // let searchInfo = this.state.search ? (
    //   <div>
    //     { this.state.search !== params.query ? (
    //     <div>
    //       Click the search button to load new results for query "{ this.state.search }"
    //     </div>
    //     ) : '' }
    //   </div>
    // ) : (
    //   <div>
    //     Start typing a query and hit the search button.
    //   </div>
    // );

    return (
      <div>
        <h3>SEARCH YOUR LIBRARY</h3>
        <Input type="search" ref="search" defaultValue={this.state.search} addonAfter={searchButton} />
        { this.state.loading ? (
        <Well>
          <center>
            <span className="glyphicon glyphicon-refresh spinning" style={{fontSize: 40}}></span><br />
            <br />
            Hang in there, this might take a while...
          </center>
        </Well>
        ) : (this.state.tracks.length > 0 ? (
          <FilterableTracks tracks={this.state.tracks} search={this.state.search} />
        ) : '') }
      </div>
    );
  }
});

export default SearchResults;
