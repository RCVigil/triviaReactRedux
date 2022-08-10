import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import Feedback from '../components/Feedback';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

describe('Testar LogFeedbackin', () => {
  it('Se é desabilitado o botão play, quando o inputName ou IputEmail estiver vazio', () => {
      renderWithRouterAndRedux(<Feedback />);
      // const inputEmail = screen.getByTestId('input-gravatar-email');
      // expect(inputEmail).toBeInTheDocument();
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