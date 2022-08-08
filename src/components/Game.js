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

  render() {
    const { questions, count } = this.state;
    console.log(questions);
    return (
      <div>
        <Header />
        <div>
          { questions.length > 0 && questions.find((valueQuestion, index) => index === count)}
        </div>
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.objectOf().isRequired,
};
