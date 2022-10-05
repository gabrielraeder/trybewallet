import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockData from './helpers/mockData';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWith';

const initialState = {
  user: {
    email: 'gabrielraeder@eu.com',
    darkMode: false,
  },
  wallet: {
    currencies: [
      'USD',
      'CAD',
      'GBP',
      'ARS',
      'BTC',
      'LTC',
      'EUR',
      'JPY',
      'CHF',
      'AUD',
      'CNY',
      'ILS',
      'ETH',
      'XRP',
      'DOGE',
    ],
    expenses: [
      {
        id: 0,
        value: '5',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
        description: 'teste',
        exchangeRates: { ...mockData },
      },
      {
        id: 1,
        value: '15',
        currency: 'BTC',
        method: 'Cartão de crédito',
        tag: 'Transporte',
        description: 'teste2',
        exchangeRates: { ...mockData },
      },
      {
        id: 2,
        value: '30',
        currency: 'DOGE',
        method: 'Cartão de débito',
        tag: 'Trabalho',
        description: 'teste3',
        exchangeRates: { ...mockData },
      },
    ],
    editor: false,
    idToEdit: 0,
    isFetching: false,
    error: '',
  },
};

describe('', () => {
  it('Testa botão de excluir despesa', () => {
    const { store } = renderWithRouterAndRedux(<App />, { initialState, initialEntries: ['/carteira'] });

    // const excludeBtns = screen.getAllByRole('button', { name: 'Excluir' });
    const excludeBtns = screen.getAllByTestId('delete-btn');
    const total = screen.getByTestId('total-field');
    const totalValue = total.textContent;

    const rows = screen.getAllByRole('row');
    const contentRows = rows.filter((row, index) => index !== 0);

    contentRows.forEach((row, index) => {
      expect(row.children[8]).toContainElement(excludeBtns[index]);
    });

    userEvent.click(excludeBtns[1]);

    expect(contentRows[1]).not.toBeInTheDocument();

    const state = store.getState();
    const { wallet: { expenses } } = state;
    expect(expenses).toHaveLength(2);

    const totalValue2 = total.textContent;
    console.log(totalValue);
    expect(totalValue).toBe('2244.66');
    expect(totalValue2).toBe('36.13');
    expect(totalValue).not.toBe(totalValue2);
  });
});
