import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Ranking extends Component {
  render() {
    const { history } = this.props;
    return (
      <div data-testid="ranking-title">
        <h1>Ranking</h1>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => { history.push('/'); } }
        >
          Go Home
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.func,
}.isRequired;

export default Ranking;
