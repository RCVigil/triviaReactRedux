import { screen } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

const INITIAL_STATE = {
    name: 'Victor Test',
    gravatarEmail: 'hehe',
    score: 30,
}

describe('Testar Login', () => {
    it('Se é desabilitado o botão play, quando o inputName ou IputEmail estiver vazio', () => {
        const { history } = renderWithRouterAndRedux(<App />, { player: INITIAL_STATE });
        history.push('/game');
        const { pathname } = history.location;
        expect(pathname).toBe('/game');
        const total = screen.getByTestId('header-score');
        const name = screen.getByTestId('header-player-name');

        expect(total).toBeInTheDocument();
        expect(name).toBeInTheDocument();

        expect(name.innerHTML).toBe('Victor Test');
        expect(total.innerHTML).toBe('30');

    });
});