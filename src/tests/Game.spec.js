import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import Game from '../components/Game';

// describe('Testando endpoint Game', () => {
//   it('Testando a imagem de gravartar', () => {
//     renderWithRouterAndRedux(<Game />);
//     const imag = screen.getByRole('img');
//     expect(imag).toBeInTheDocument();
//     const nameUser = screen.getByTestId('header-player-name');
//     expect(nameUser).toBeInTheDocument();
//     const total = screen.getByTestId('header-score');
//     expect(total).toBeInTheDocument();
//     const tempo = screen.getByRole('heading', { name: /Tempo/i, level: 1 });
//     expect(tempo).toBeInTheDocument();
//     const button = screen.getByTestId('btn-next');
//     expect(button).toBeInTheDocument();
//   })
// })


import objGetApi from '../helper/objGetApi';
import { invalidTokenQuestionsResponse, questionsResponse } from '../../cypress/mocks/questions';
import userEvent from '@testing-library/user-event';
import App from '../App';

const player = {
  name: "Hugo",
  assertions: 2,
  score: 109,
  gravatarEmail: "teste@teste.com",
  url: "https://www.gravatar.com/avatar/ce11fce876c93ed5d2a72da660496473",
};

describe('Testando endpoint Game', () => {
  it('Testando Se ao clicar nas respostas o botão "Next" deve aparecer', async () => {
    const objGetApiMock = jest.spyOn(objGetApi, 'getQuestionsApi').mockResolvedValue(questionsResponse);
    const {debug} = renderWithRouterAndRedux(<Game />, { player });
    await waitFor(
      () => expect(objGetApiMock).toHaveBeenCalledTimes(1),
      { timeout: 1000 }
    );

    const buttonCorrect = screen.getByTestId('correct-answer');
    expect(buttonCorrect).toBeInTheDocument();
    userEvent.click(buttonCorrect);
    
    const buttonNext = screen.getByTestId('btn-next');
    expect(buttonNext).toBeInTheDocument();
    userEvent.click(buttonNext);

    const buttonWrong = screen.getAllByTestId(/wrong-answer/i);
    expect(buttonWrong[0]).toBeInTheDocument();
    userEvent.click(buttonWrong[0]);
  });

  it('Testando Se ao responder todas as questões, ele redireciona para página de feedback', async () => {
    const objGetApiMock = jest.spyOn(objGetApi, 'getQuestionsApi').mockResolvedValue(questionsResponse);
    const {debug, history} = renderWithRouterAndRedux(<App />, { player }, "/game");
    await waitFor(
      () => expect(objGetApiMock).toHaveBeenCalledTimes(2),
      { timeout: 1000 }
    );

    // Questão 1
    const buttonCorrect1 = screen.getByTestId('correct-answer');
    expect(buttonCorrect1).toBeInTheDocument();
    userEvent.click(buttonCorrect1);
    const buttonNext1 = screen.getByTestId('btn-next');
    expect(buttonNext1).toBeInTheDocument();
    userEvent.click(buttonNext1);

    // Questão 2
    const buttonWrong2 = screen.getAllByTestId(/wrong-answer/i);
    expect(buttonWrong2[0]).toBeInTheDocument();
    userEvent.click(buttonWrong2[0]);
    const buttonNext2 = screen.getByTestId('btn-next');
    expect(buttonNext2).toBeInTheDocument();
    userEvent.click(buttonNext2);
    
    // Questão 3
    const buttonWrong3 = screen.getAllByTestId(/wrong-answer/i);
    expect(buttonWrong3[0]).toBeInTheDocument();
    userEvent.click(buttonWrong3[0]);
    const buttonNext3 = screen.getByTestId('btn-next');
    expect(buttonNext3).toBeInTheDocument();
    userEvent.click(buttonNext3);

     // Questão 4
    const buttonCorrect4 = screen.getByTestId('correct-answer');
    expect(buttonCorrect4).toBeInTheDocument();
    userEvent.click(buttonCorrect4);
    const buttonNext4 = screen.getByTestId('btn-next');
    expect(buttonNext4).toBeInTheDocument();
    userEvent.click(buttonNext4);

    // Questão 5
    const buttonCorrect5 = screen.getByTestId('correct-answer');
    expect(buttonCorrect5).toBeInTheDocument();
    userEvent.click(buttonCorrect5);
    const buttonNext5 = screen.getByTestId('btn-next');
    expect(buttonNext5).toBeInTheDocument();
    userEvent.click(buttonNext5);
    const { pathname } = history.location;
    expect(pathname).toBe("/feedback");
  });

  it('Testa o Token invalido', async () => {
    const tokenFall1 = jest.spyOn(objGetApi, 'getQuestionsApi').mockResolvedValue(invalidTokenQuestionsResponse);
    const {debug, history} = renderWithRouterAndRedux(<App />, { player }, "/game");
    await waitFor(
      () => expect(tokenFall1).toHaveBeenCalledTimes(3),
      { timeout: 1000 }
    );

    const {pathname} = history.location;
    expect(pathname).toBe("/")
    debug();
  });
});