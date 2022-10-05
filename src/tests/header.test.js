import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWith';

const initialState = {
  user: {
    email: 'gabrielraeder@outlook.com.br',
  },
};

describe('Testa Componente Header', () => {
  it('Testa se os textos estão na tela', () => {
    renderWithRouterAndRedux(<App />, { initialState, initialEntries: ['/carteira'] });

    const header = screen.getByRole('heading', { name: /trybewallet/i, level: 1 });
    expect(header).toBeInTheDocument();
    const email = screen.getByRole('heading', { name: /gabriel/i, level: 4 });
    expect(email).toHaveTextContent(initialState.user.email);
    const total = screen.getByRole('heading', { name: '0.00', level: 3 });
    expect(total).toBeInTheDocument();
    const currency = screen.getByRole('heading', { name: /brl/i, level: 3 });
    expect(currency).toBeInTheDocument();
  });
});
