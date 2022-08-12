import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actionResetScore } from '../redux/actions/action';
import Header from './Header';
import '../css/FeedbackCss.css';

class Feedback extends Component {
  componentDidMount() {
    if (localStorage.getItem('ranking')) {
      this.setNewItem();
    } else {
      this.setLocalStore();
    }
  }

  setLocalStore = () => {
    const { name, score, picture } = this.props;
    const obj = {
      name,
      score,
      picture,
    };
    const arr = [obj];
    const jsonArr = JSON.stringify(arr);
    localStorage.setItem('ranking', jsonArr);
  }

  setNewItem = () => {
    const { name, score, picture } = this.props;
    const obj = {
      name,
      score,
      picture,
    };
    const resultOld = localStorage.getItem('ranking');
    const parseObj = JSON.parse(resultOld);
    const arr = [...parseObj, obj];
    const jsonArr = JSON.stringify(arr);
    localStorage.setItem('ranking', jsonArr);
  }

  handleButton = () => {
    const { history, dispatch } = this.props;
    dispatch(actionResetScore());
    history.push('/');
  }

  render() {
    const { acertos, score } = this.props;
    const THREE_ASSERTIONS = 3;
    return (
      <div className="divDisplay">
        <Header />
        <h1 className="classH1Feed">Feedback</h1>
        <p className="classP">
          Acertos
          {' '}
          <span data-testid="feedback-total-question">{ acertos }</span>
        </p>
        <h2 className="classH2">
          Result:
          {' '}
          <span data-testid="feedback-text">
            {
              acertos < THREE_ASSERTIONS
                ? 'Could be better...'
                : 'Well Done!'
            }
          </span>
        </h2>
        <h1 className="classH1">
          Total:
          {' '}
          <span data-testid="feedback-total-score">{score}</span>
        </h1>

        <div className="divButton">
          <button
            className="buttonClick"
            type="button"
            data-testid="btn-play-again"
            onClick={ this.handleButton }
          >
            Play Again
          </button>
          <Link to="/ranking">
            <button
              className="buttonClick"
              type="button"
              data-testid="btn-ranking"
            >
              Ranking
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

Feedback.propTypes = {
  acertos: PropTypes.number,
  name: PropTypes.string,
  picture: PropTypes.string,
  score: PropTypes.number,
}.isRequired;

const mapStateToProps = (state) => ({
  name: state.player.name,
  picture: state.player.url,
  acertos: state.player.assertions,
  score: state.player.score,
});

export default connect(mapStateToProps)(Feedback);
