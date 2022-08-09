import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from './Header';
import shuffleArray from '../helper/randomArray';
import { actionScore } from '../redux/actions/action';

const ONE_SECOND = 1000;

class Game extends Component {
  state = {
    questions: [],
    count: 0,
    borderStyle: true,
    assertions: 0,
    timer: 30,
    randomAnswer: [],
  }

  async componentDidMount() {
    const { history } = this.props;
    const token = localStorage.getItem('token');
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const responseJson = await response.json();

    const arrOfRandonAnswer = responseJson.results
      .map((result) => ([...shuffleArray(result)]));

    this.setState({
      questions: responseJson.results,
      randomAnswer: arrOfRandonAnswer,
    });

    if (responseJson.response_code !== 0) {
      localStorage.removeItem('token');
      history.push('/');
    }

    this.timerID = setInterval(() => {
      this.setState((prevState) => ({
        timer: prevState.timer - 1,
      }));
    }, ONE_SECOND);
  }

  calculateScore = (difficulty) => {
    const { timer } = this.state;

    const score = { pattern: 10,
      hard: 3,
      medium: 2,
      easy: 1 };

    const scoreDificult = () => {
      switch (difficulty) {
      case 'hard':
        return score.hard;
      case 'medium':
        return score.medium;
      case 'easy':
        return score.easy;
      default:
        break;
      }
    };

    return (score.pattern + scoreDificult() + timer);
  }

  clickButtonAnswer = (answer, correctAnswer, difficulty) => {
    const { dispatchScore } = this.props;
    let { assertions } = this.state;

    this.setState({
      borderStyle: false,
    });

    if (answer === correctAnswer) {
      this.setState({
        assertions: assertions += 1,
      });
      dispatchScore(this.calculateScore(difficulty));
    }
  }

  mudarCor = (resposta, correctAnswer) => {
    const correctStyle = { border: '3px solid rgb(6, 240, 15)' };
    const wrongStyle = { border: '3px solid red' };
    if (resposta === correctAnswer) {
      return correctStyle;
    }
    return wrongStyle;
  }

  funcSetButton = () => {
    const { timer } = this.state;
    if (timer <= 0) {
      clearInterval(this.timerID);
      return '0';
    }
    return timer;
  }

  render() {
    const { questions, count, borderStyle, randomAnswer, timer } = this.state;
    const normalStyle = { border: 'none' };

    return (
      <div>
        <Header />
        <div>

          <h1>
            Tempo
            {' '}
            { this.funcSetButton() }
            {' '}
          </h1>

          { questions.length > 0 && questions.map((question, index) => (
            index === count && (
              <div key={ index }>
                <p
                  data-testid="question-category"
                >
                  {question.category}
                </p>
                <p
                  data-testid="question-text"
                >
                  {question.question}
                </p>
                <div
                  data-testid="answer-options"
                >
                  {randomAnswer.map((answers, index2) => index2 === count && (
                    answers.map((answer, index3) => (
                      <button
                        disabled={ timer === 0 }
                        style={ (borderStyle)
                          ? normalStyle
                          : this.mudarCor(answer, question.correct_answer) }
                        type="button"
                        key={ index3 }
                        data-testid={ answer === question.correct_answer
                          ? 'correct-answer'
                          : `wrong-answer-${index3}` }
                        onClick={ () => this.clickButtonAnswer(answer,
                          question.correct_answer, question.difficulty) }
                      >
                        { answer }
                      </button>
                    ))
                  ))}
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchScore: (score) => dispatch(actionScore(score)),
});

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatchScore: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Game);
