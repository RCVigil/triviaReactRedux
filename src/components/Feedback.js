import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './Header';

class Feedback extends Component {
  render() {
    const {score, assertions} = this.props;
    return (
      <div data-testid="feedback-text">
        <Header />
        <h4 data-testid="feedback-total-score">{score}</h4>
        <h5 data-testid="feedback-total-question">{assertions}</h5>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.player.score,
  assertions: state.player.assertions,
});

export default connect(mapStateToProps)(Feedback);
