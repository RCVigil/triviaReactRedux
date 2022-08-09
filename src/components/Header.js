import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, nameUser, total, assertions } = this.props;
    const emailUser = md5(email).toString();
    const MIN_ASSERTIONS = 3;
    const url = `https://www.gravatar.com/avatar/${emailUser}`;
    return (
      <div>
        <header>
          <img
            data-testid="header-profile-picture"
            src={ url }
            alt={ nameUser }
          />
          <p
            data-testid="header-player-name"
          >
            Name User
            {' '}
            {nameUser}
          </p>
          <p>
            Total
            {' '}
            <span data-testid="header-score">{total}</span>
          </p>
          <h3 data-testid="feedback-text">
            {assertions < MIN_ASSERTIONS ? 'Could be better...' : 'Well Done!'}
          </h3>
        </header>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
  nameUser: PropTypes.string,
  total: PropTypes.number,
}.isRequired;

const mapStateToProps = (state) => ({
  email: state.player.gravatarEmail,
  nameUser: state.player.name,
  total: state.player.score,
  assertions: state.player.assertions,
});

export default connect(mapStateToProps)(Header);
