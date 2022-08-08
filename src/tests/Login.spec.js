import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import Login from '../components/Login';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

const INITIAL_STATE = {
    name: 'valido',
    gravatarEmail: 'hehe'
}

describe('Testar Login', () => {
    it('Se é desabilitado o botão play, quando o inputName ou IputEmail estiver vazio', () => {
        renderWithRouterAndRedux(<App />);
        const inputEmail = screen.getByTestId('input-gravatar-email');
        expect(inputEmail).toBeInTheDocument();
        const inputName = screen.getByTestId('input-player-name');
        expect(inputName).toBeInTheDocument();
        const btnPlay = screen.getByTestId('btn-play');
        expect(btnPlay).toBeInTheDocument();

        // Quando name estiver vazio, o botão deve haver a propriedade disabled
        userEvent.type(inputEmail, 'Valido');
        expect(btnPlay).toHaveProperty("disabled", true);

        // Quando tudo estiver preenchido corretamente, o botão não deve a propriedade disabled
        userEvent.type(inputName, 'Valido');
        expect(btnPlay).toHaveProperty("disabled", false);
    });
    
    it('', async () => {
        const STATE = {token: '6a190b20f637bae6d0c4841364b563862044b3e304258380af2581d69728e1c9'};
        jest.spyOn(global, 'fetch');
        global.fetch.mockResolvedValue({
            json: jest.fn().mockResolvedValue(STATE),
        });
        renderWithRouterAndRedux(<Login />, { initialState: INITIAL_STATE });
        const inputEmail = screen.getByTestId('input-gravatar-email');
        expect(inputEmail).toBeInTheDocument();
        const inputName = screen.getByTestId('input-player-name');
        expect(inputName).toBeInTheDocument();
        const btnPlay = screen.getByTestId('btn-play');
        expect(btnPlay).toBeInTheDocument();

        userEvent.type(inputName, 'Valido');
        userEvent.type(inputEmail, 'Valido');
        userEvent.click(btnPlay);
    });
});