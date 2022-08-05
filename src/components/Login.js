import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import getApitrivia from '../helper/getApiTrivia';

export default class Login extends Component {
  state = {
    userName: '',
    userEmail: '',
    button: true,
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.setState({
      button: this.validInput(),
    }));
  }

  validInput = () => {
    const { userName, userEmail } = this.state;
    return !(userName.length && userEmail.length);
  }

  handleButton = async () => {
    const { history } = this.props;
    const { token } = await getApitrivia();
    history.push('/game');

    localStorage.setItem('token', token);
  }

  // validarEmail = (email) => {
  //   const validEmail = /\S+@\S+\.\S+/;
  //   return validEmail.test(email);
  // }

  render() {
    const { button } = this.state;
    return (
      <div>
        <form>
          <input
            type="text"
            name="userName"
            data-testid="input-player-name"
            onChange={ this.handleChange }
          />
          <input
            type="email"
            name="userEmail"
            data-testid="input-gravatar-email"
            onChange={ this.handleChange }
          />
          <button
            type="button"
            data-testid="btn-play"
            disabled={ button }
            onClick={ this.handleButton }
          >
            Play
          </button>
          <Link to="/settings">
            <button
              type="button"
              data-testid="btn-settings"
            >
              Configurações
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};
