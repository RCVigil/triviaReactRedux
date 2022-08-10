import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

const player = {
  name: "Hugo",
  assertions: 2,
  score: 109,
  gravatarEmail: "teste@teste.com",
  url: "https://www.gravatar.com/avatar/ce11fce876c93ed5d2a72da660496473",
};

describe('Testar Ranking', () => {
  it('Se ao clicar no Button "Go Home" é encaminhado para tela de Login', () => {
    const obj = {
      name: "Hugo",
      score: 109,
      picture: "https://www.gravatar.com/avatar/ce11fce876c93ed5d2a72da660496473",
    };
    const arr = [obj];
    const jsonArr = JSON.stringify(arr);
    localStorage.setItem('ranking', jsonArr);
    
    const { history } = renderWithRouterAndRedux(<App />, { player }, "/ranking");

    const buttonGoHome = screen.getByRole('button', { name: /go home/i });
    expect(buttonGoHome).toBeInTheDocument();
    userEvent.click(buttonGoHome);

    const { pathname } = history.location;
    expect(pathname).toEqual("/");

    screen.logTestingPlaygroundURL();
  })
});