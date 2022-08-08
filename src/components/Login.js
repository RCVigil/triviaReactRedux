import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import getApitrivia from '../helper/getApiTrivia';
import { actionAddUser } from '../redux/actions/action';

class Login extends Component {
  state = {
    userName: '',
    userEmail: '',
    button: true,
  }

  async componentDidMount() {
    const { token } = await getApitrivia();
    localStorage.setItem('token', token);
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

  handleButton = () => {
    const { dispatch } = this.props;
    dispatch(actionAddUser(this.state));
  }

  render() {
    const { button } = this.state;
    return (
      <div>
        <form>
          <input
            type="text"
            name="userName"
            placeholder="Name*"
            data-testid="input-player-name"
            onChange={ this.handleChange }
          />
          <input
            type="email"
            placeholder="Email*"
            name="userEmail"
            data-testid="input-gravatar-email"
            onChange={ this.handleChange }
          />
          <Link to="/game">
            <button
              type="button"
              data-testid="btn-play"
              disabled={ button }
              onClick={ this.handleButton }
            >
              Play
            </button>
          </Link>
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
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
