import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';

export default class Game extends Component {
  state = {
    questions: [],
    count: 0,
  }

  async componentDidMount() {
    const { history } = this.props;
    const token = localStorage.getItem('token');

    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const responseJson = await response.json();

    this.setState({
      questions: responseJson.results,
    });

    // if (this.verificationToken()) {
    //   const { token } = await getApitrivia();
    //   dispatch(actionAddUser(this.state));
    //   localStorage.setItem('token', token);
    // }

    if (responseJson.response_code !== 0) {
      localStorage.removeItem('token');
      history.push('/');
    }
  }

  // verificationToken = () => {
  //   const verifyToken = localStorage.getItem('token');
  //   return !(verifyToken !== null && verifyToken.length === VALID_LENGTH_TOKEN);
  // }

  shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  render() {
    const { questions, count } = this.state;
    console.log(questions);
    return (
      <div>
        <Header />
        <div>
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
                  {this.shuffleArray([question.correct_answer,
                    ...question.incorrect_answers])
                    .map((answer, index2) => (
                      <button
                        type="button"
                        key={ index2 }
                        data-testid={ answer === question.correct_answer
                          ? 'correct-answer'
                          : `wrong-answer-${index2}` }
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
