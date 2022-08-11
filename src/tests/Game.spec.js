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
import { questionsResponse } from '../../cypress/mocks/questions';

const player = {
  name: "Hugo",
  assertions: 2,
  score: 109,
  gravatarEmail: "teste@teste.com",
  url: "https://www.gravatar.com/avatar/ce11fce876c93ed5d2a72da660496473",
};

describe('Testando endpoint Game', () => {
  it('Testando a imagem de gravartar', async () => {

    // jest.spyOn(global, 'fetch');
    //   global.fetch.mockResolvedValue({
    //   json: jest.fn().mockResolvedValue(questionsResponse),
    // }); 

    // const objComMock = jest.spyOn(objTesteMock, 'funcMockTeste').mockImplementation(() => 'Teste Mockado!');
    // const objGetApiMock = jest.spyOn(objGetApi, 'getQuestionsApi').mockImplementation(() => Promise.resolve(questionsResponse));
    const objGetApiMock = jest.spyOn(objGetApi, 'getQuestionsApi').mockResolvedValue(questionsResponse);

    const {debug} = renderWithRouterAndRedux(<Game />, { player });

    // expect(objGetApiMock).toHaveBeenCalledTimes(2)
    
    await waitFor(
      () => expect(objGetApiMock).toHaveBeenCalledTimes(1),
      { timeout: 1000 }
    );

    // debug()

    // screen.logTestingPlaygroundURL();
  })

})