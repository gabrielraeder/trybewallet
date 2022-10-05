import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWith';

const EMAIL = 'gabrielraeder@eu.com';
const EMAIL_TEST_ID = 'email-input';
const PASS_TEST_ID = 'password-input';

describe('Testa componente Login', () => {
  it('testa inputs e clique no botão', () => {
    const { history, store } = renderWithRouterAndRedux(<App />);
    const email = screen.getByTestId(EMAIL_TEST_ID);
    const password = screen.getByTestId(PASS_TEST_ID);
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();

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

  it('testa se botão está desabilitado com email errado', () => {
    renderWithRouterAndRedux(<App />);
    const email = screen.getByTestId(EMAIL_TEST_ID);
    const password = screen.getByTestId(PASS_TEST_ID);

    userEvent.type(email, 'email');
    userEvent.type(password, '123456');

    const button = screen.getByRole('button', { name: /entrar/i });

    expect(button).toBeDisabled();
  });

  it('testa se botão está desabilitado com senha menor que 6n', () => {
    renderWithRouterAndRedux(<App />);
    const email = screen.getByTestId(EMAIL_TEST_ID);
    const password = screen.getByTestId(PASS_TEST_ID);

    userEvent.type(email, EMAIL);
    userEvent.type(password, '12345');

    const button = screen.getByRole('button', { name: /entrar/i });

    expect(button).toBeDisabled();
  });
});
