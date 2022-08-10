import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import Game from '../components/Game';

describe('Testando endpoint Game', () => {
  it('Testando a imagem de gravartar', () => {
    renderWithRouterAndRedux(<Game />);
    const imag = screen.getByRole('img');
    expect(imag).toBeInTheDocument();
    const nameUser = screen.getByTestId('header-player-name');
    expect(nameUser).toBeInTheDocument();
    const total = screen.getByTestId('header-score');
    expect(total).toBeInTheDocument();
    const tempo = screen.getByRole('heading', { name: /Tempo/i, level: 1 });
    expect(tempo).toBeInTheDocument();
    const button = screen.getByTestId('btn-next');
    expect(button).toBeInTheDocument();
  })
})