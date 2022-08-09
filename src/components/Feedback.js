import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from './Header';

class Feedback extends Component {
  render() {
    const { score, assertions, history } = this.props;
    return (
      <div data-testid="feedback-text">
        <Header />
        <h4 data-testid="feedback-total-score">{score}</h4>
        <h5 data-testid="feedback-total-question">{assertions}</h5>
        <button
          type="button"
          onClick={ () => { history.push('/'); } }
          data-testid="btn-play-again"
        >
          Play Again
        </button>
        <button
          type="button"
          onClick={ () => { history.push('/ranking'); } }
          data-testid="btn-ranking"
        >
          Ranking
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.player.score,
  assertions: state.player.assertions,
});

Feedback.propTypes = {
  score: PropTypes.number,
  assertions: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps)(Feedback);
