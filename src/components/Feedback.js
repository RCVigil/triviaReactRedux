import React, { Component } from 'react';
import Header from './Header';

export default class Feedback extends Component {
  render() {
    return (
      <h1 data-testid="feedback-text">
        <Header />
      </h1>
    );
  }
}
