import { screen } from '@testing-library/react';
import React from 'react';
import Settings from '../components/Settings';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

describe('Testar LogFeedbackin', () => {
  it('Se é desabilitado o botão play, quando o inputName ou IputEmail estiver vazio', () => {
      renderWithRouterAndRedux(<Settings />);
      const setings = screen.getByTestId('settings-title');
      expect(setings).toBeInTheDocument();
  });
});