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

describe('Testar Feedbackin', () => {
  it('Se é renderizado os components na tela', () => {
    renderWithRouterAndRedux(<App />, { player }, "/feedback");
    // const { pathname } = history.location;

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
    const buttonRankingAgain = screen.getByRole('button', { name: /ranking/i });
    expect(buttonRankingAgain).toBeInTheDocument();
    
    screen.logTestingPlaygroundURL();
      // const inputEmail = screen.getByTestId('input-gravatar-email');
      // const inputName = screen.getByTestId('input-player-name');
      // expect(inputName).toBeInTheDocument();
      // const btnPlay = screen.getByTestId('btn-play');
      // expect(btnPlay).toBeInTheDocument();

      // // Quando name estiver vazio, o botão deve haver a propriedade disabled
      // userEvent.type(inputEmail, 'Valido');
      // expect(btnPlay).toHaveProperty("disabled", true);

      // // Quando tudo estiver preenchido corretamente, o botão não deve a propriedade disabled
      // userEvent.type(inputName, 'Valido');
      // expect(btnPlay).toHaveProperty("disabled", false);
  });
});