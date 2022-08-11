import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from './Header';
import shuffleArray from '../helper/randomArray';
import { actionScore } from '../redux/actions/action';

import objGetApi from '../helper/objGetApi';

import './Game.css';

const ONE_SECOND = 1000;

class Game extends Component {
  state = {
    questions: [],
    count: 0,
    borderStyle: true,
    timer: 30,
    randomAnswer: [],
    buttonNext: false,
  }

  async componentDidMount() {
    const { history } = this.props;
    const responseJson = await objGetApi.getQuestionsApi();

    if (responseJson.response_code !== 0) {
      localStorage.removeItem('token');
      history.push('/');
    }

    const arrOfRandonAnswer = responseJson.results
      .map((result) => ([...shuffleArray(result)]));

    this.setState({
      questions: responseJson.results,
      randomAnswer: arrOfRandonAnswer,
    });
    this.timer();
  }

  timer = () => {
    this.timerID = setInterval(() => {
      this.setState((prevState) => ({
        timer: prevState.timer - 1,
      }));
    }, ONE_SECOND);
  }

  clickButtonAnswer = (answer, correctAnswer, difficulty) => {
    clearInterval(this.timerID);
    const { dispatch } = this.props;

    this.setState({
      borderStyle: false,
      buttonNext: true,
    });

    if (answer === correctAnswer) {
      const { timer } = this.state;
      const sum = 10;
      const role = { hard: 3, medium: 2, easy: 1 };
      const scoreTotal = sum + (timer * role[difficulty]);
      dispatch(actionScore(scoreTotal, 1));
    }
  }

  mudarCor = (resposta, correctAnswer) => {
    const correctStyle = { border: '3px solid rgb(6, 240, 15)', margin: '2px' };
    const wrongStyle = { border: '3px solid red', margin: '2px' };
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

  changeCount = () => {
    const { count } = this.state;
    const { history } = this.props;
    const NUM_COUNT = 4;
    this.setState((prevState) => ({
      count: prevState.count + 1,
      buttonNext: false,
      borderStyle: true,
      timer: 30,
    }));
    if (count >= NUM_COUNT) {
      history.push('/feedback');
    }
    this.timer();
  }

  render() {
    const { questions, count, borderStyle, randomAnswer, timer, buttonNext } = this.state;
    const normalStyle = { border: 'none', margin: '5px' };

    return (
      <div className="game">
        <Header />
        <div className="game_containner">

          <h1>
            Tempo
            {' '}
            { this.funcSetButton() }
          </h1>

          { questions.length > 0 && questions.map((question, index) => (
            index === count && (
              <div key={ index } className="answer_options">
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
                        className="button"
                        disabled={ timer === 0 || buttonNext }
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
                { (timer === 0 || buttonNext) && (
                  <button
                    className="button"
                    type="button"
                    data-testid="btn-next"
                    onClick={ this.changeCount }
                  >

                    Next
                  </button>
                )}
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
    push: PropTypes.func,
  }),
  dispatch: PropTypes.func,
}.isRequired;

export default connect()(Game);
