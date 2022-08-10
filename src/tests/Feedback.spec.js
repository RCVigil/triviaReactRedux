import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import Feedback from '../components/Feedback';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

const player = {
  name: "Hugo",
  assertions: 2,
  score: 109,
  gravatarEmail: "teste@teste.com",
  url: "https://www.gravatar.com/avatar/ce11fce876c93ed5d2a72da660496473",
};

const player2 = {
  name: "Hugo",
  assertions: 4,
  score: 109,
  gravatarEmail: "teste@teste.com",
  url: "https://www.gravatar.com/avatar/ce11fce876c93ed5d2a72da660496473",
};

describe('Testar Feedbackin', () => {
  it('Se é renderizado os components na tela', () => {
    // const { pathname } = history.location;

    const obj = {
      name: "Hugo",
      score: 109,
      picture: "https://www.gravatar.com/avatar/ce11fce876c93ed5d2a72da660496473",
    };
    const arr = [obj];
    const jsonArr = JSON.stringify(arr);
    localStorage.setItem('ranking', jsonArr);
    renderWithRouterAndRedux(<App />, { player }, "/feedback");

    const feedbackText = screen.getByRole('heading', { name: /feedback/i })
    expect(feedbackText).toBeInTheDocument();
    const acertsText = screen.getByText(/acertos/i);
    expect(acertsText).toBeInTheDocument();
    const numberOfAcertsText = screen.getByText(/2/i);
    expect(numberOfAcertsText).toBeInTheDocument();
    const resultText = screen.getByRole('heading', { name: /result: could be better\.\.\./i });
    expect(resultText).toBeInTheDocument();
    const msgText = screen.getByText(/could be better\.\.\./i);
    expect(msgText).toBeInTheDocument();
    const headingText = screen.getByRole('heading', { name: /total: 109/i });
    expect(headingText).toBeInTheDocument();
    const punctuationText = screen.getAllByText(/109/i);
    expect(punctuationText.length).toBe(2);
    const buttonPlayAgain = screen.getByRole('button', { name: /play again/i });
    expect(buttonPlayAgain).toBeInTheDocument();
    const buttonRanking = screen.getByRole('button', { name: /ranking/i });
    expect(buttonRanking).toBeInTheDocument();
    
    userEvent.click(buttonRanking);
    screen.logTestingPlaygroundURL();
  });

  it('Se é renderizado os components na tela', () => {
    // const { pathname } = history.location;
    localStorage.clear();
    renderWithRouterAndRedux(<App />, { player: player2 }, "/feedback");

    const buttonPlayAgain = screen.getByRole('button', { name: /play again/i });
    expect(buttonPlayAgain).toBeInTheDocument();
    userEvent.click(buttonPlayAgain);

    screen.logTestingPlaygroundURL();
  });
});