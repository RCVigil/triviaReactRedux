import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import shuffleArray from '../helper/randomArray';

const ONE_SECOND = 1000;

export default class Game extends Component {
  state = {
    questions: [],
    count: 0,
    borderStyle: true,
    assertions: 0,
    timer: 30,
    arraySort: [],
  }

  async componentDidMount() {
    const { history } = this.props;
    const { count } = this.state;
    const token = localStorage.getItem('token');
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const responseJson = await response.json();

    this.setState({
      questions: responseJson.results,
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

  clickButtonAnswer = (answer, correctAnswer) => {
    let { assertions } = this.state;

    this.setState({
      borderStyle: false,
    });

    if (answer === correctAnswer) {
      this.setState({
        assertions: assertions += 1,
      });
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
    const { questions, count, borderStyle, arraySort, timer } = this.state;
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
                  {arraySort
                    .map((answer, index2) => (
                      <button
                        disabled={ timer === 0 }
                        style={ (borderStyle)
                          ? normalStyle
                          : this.mudarCor(answer, question.correct_answer) }
                        type="button"
                        key={ index2 }
                        data-testid={ answer === question.correct_answer
                          ? 'correct-answer'
                          : `wrong-answer-${index2}` }
                        onClick={ () => this.clickButtonAnswer(answer,
                          question.correct_answer) }
                      >
                        { answer }
                      </button>
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

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
