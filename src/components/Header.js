import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionUrl } from '../redux/actions/action';

class Header extends Component {
  render() {
    const { email, nameUser, total, dispatch } = this.props;
    const emailUser = md5(email).toString();
    const url = `https://www.gravatar.com/avatar/${emailUser}`;
    dispatch(actionUrl(url));
    return (
      <div>
        <header>
          <img
            data-testid="header-profile-picture"
            src={ url }
            alt={ nameUser }
          />
          <p>
            Name User
            {' '}
            <span data-testid="header-player-name">{nameUser}</span>
          </p>
          <p>
            Total
            {' '}
            <span data-testid="header-score">{total}</span>
          </p>
        </header>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
  nameUser: PropTypes.string,
  total: PropTypes.number,
  dispatch: PropTypes.func,
}.isRequired;

const mapStateToProps = (state) => ({
  email: state.player.gravatarEmail,
  nameUser: state.player.name,
  total: state.player.score,
});

export default connect(mapStateToProps)(Header);
