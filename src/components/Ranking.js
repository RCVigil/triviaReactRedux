import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionResetScore } from '../redux/actions/action';
import '../css/Ranking.css';

class Ranking extends Component {
  handleButton = () => {
    const { history, dispatch } = this.props;
    dispatch(actionResetScore());
    history.push('/');
  }

  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const rankingSort = ranking.sort((a, b) => b.score - a.score);
    return (
      <div className="page-ranking">
        <button
          type="button"
          data-testid="btn-go-home"
          className="btn-go-home"
          onClick={ this.handleButton }
        >
          Go Home
        </button>
        <h1
          data-testid="ranking-title"
          className="ranking-title"
        >
          Ranking
        </h1>
        <div className="page-ranking-div">
          { rankingSort.map((player, index) => (
            <div className="div-ranking-player" key={ index }>
              <img
                src={ player.picture }
                alt={ player.name }
                className="img-player"
              />
              <div className="name-score-player">
                <p>
                  Player:
                  {' '}
                  <span data-testid={ `player-name-${index}` }>
                    {player.name}
                  </span>
                </p>

                <p>
                  Score:
                  {' '}
                  <span data-testid={ `player-score-${index}` }>
                    {player.score}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

Ranking.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect()(Ranking);
