import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWith';

describe('Testa componente Login', () => {
  it('testa inputs e clique no botão', () => {
    const { history, store } = renderWithRouterAndRedux(<App />);
    const EMAIL = 'gabrielraeder@eu.com';
    const email = screen.getByLabelText(/email/i);
    const password = screen.getByLabelText(/password/i);

    userEvent.type(email, EMAIL);
    userEvent.type(password, '123456');

    expect(email).toHaveValue(EMAIL);
    expect(password).toHaveValue('123456');

    const button = screen.getByRole('button', { name: /entrar/i });
    expect(button).toBeDefined();

    userEvent.click(button);
    expect(history.location.pathname).toBe('/carteira');

    const { user } = store.getState();
    expect(user.email).toBe(EMAIL);
  });
});
