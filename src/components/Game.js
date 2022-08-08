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
    const token = localStorage.getItem('token');

    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const responseJson = await response.json();

    responseJson.results.map((e) => this.setState({
      arraySort: shuffleArray(e),
    }));

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

      console.log('estou rodando');
    }, ONE_SECOND);
  }

  // shuffleArray = (arr) => {
  //   const newArray = [arr.correct_answer,
  //     ...arr.incorrect_answers];

  //   for (let i = newArray.length - 1; i > 0; i -= 1) {
  //     const j = Math.floor(Math.random() * (i + 1));
  //     [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  //   }
  //   return newArray;
  // }

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
    // const seconds = Math.floor((30000 / 1000) % 60);
  }

  mudarCor = (resposta, correctAnswer) => {
    const correctStyle = { border: '3px solid rgb(6, 240, 15)' };
    const wrongStyle = { border: '3px solid red' };
    if (resposta === correctAnswer) {
      return correctStyle;
    }
    return wrongStyle;
  }

  render() {
    const { questions, count, borderStyle, timer, arraySort } = this.state;
    const normalStyle = { border: 'none' };

    return (
      <div>
        <Header />
        <div>

          <h1>
            Tempo
            {' '}
            { timer }
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
  history: PropTypes.objectOf().isRequired,
};
