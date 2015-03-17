import React from 'react';
import {Glyphicon} from 'react-bootstrap';
import app from '../../bootstrap';

let Previous = React.createClass({
  previous() {
    app.get('services.mopidy')
      .then((mopidyService) => {
        mopidyService.previous();
      });
  },

  render() {
    return (
      <button
        className="btn btn-primary"
        onClick={this.previous}>
        <Glyphicon glyph="step-backward" />
      </button>
    );
  }
});

export default Previous;
