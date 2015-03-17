import React from 'react';
import {Glyphicon} from 'react-bootstrap';
import app from '../../bootstrap';

let Next = React.createClass({
  next() {
    app.get('services.mopidy')
      .then((mopidyService) => {
        mopidyService.next();
      });
  },

  render() {
    return (
      <button
        className="btn btn-primary"
        onClick={this.next}>
        <Glyphicon glyph="step-forward" />
      </button>
    );
  }
});

export default Next;
