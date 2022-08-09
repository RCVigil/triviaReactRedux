import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionResetScore } from '../redux/actions/action';

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
      <div>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.handleButton }
        >
          Go Home
        </button>
        <div>
          <h3 data-testid="ranking-title">Ranking</h3>
          { rankingSort.map((player, index) => (
            <div key={ index }>
              <img src={ player.picture } alt={ player.name } />
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
          ))}
        </div>
      </div>
    );
  }
}

export default connect()(Ranking);
