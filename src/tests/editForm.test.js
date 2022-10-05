import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockData from './helpers/mockData';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWith';

const initialState = {
  user: {
    email: 'gabrielraeder@eu.com',
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
        id: 3,
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

describe('Testa componente EditForm', () => {
  it('Clicar botão de editar', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mockData,
    }));

    const { store } = renderWithRouterAndRedux(<App />, { initialState, initialEntries: ['/carteira'] });
    const editBtns = screen.getAllByRole('button', { name: 'Editar' });
    userEvent.click(editBtns[1]);
    const state = store.getState();
    expect(state.wallet.editor).toBeTruthy();

    const valueInput = screen.getByLabelText('Valor:');
    expect(valueInput).toHaveValue('15');
    const descriptInput = screen.getByLabelText('Descrição:');
    expect(descriptInput).toHaveValue('teste2');
    const coinInput = screen.getByLabelText('Moeda:');
    expect(coinInput).toHaveValue('BTC');
    const payInput = screen.getByLabelText(/pagamento/i);
    expect(payInput).toHaveValue('Cartão de crédito');
    const tagInput = await screen.findByTestId('tag-input');
    expect(tagInput).toHaveValue('Transporte');

    userEvent.type(valueInput, '300');
    userEvent.type(descriptInput, 'TESTE2');
    userEvent.selectOptions(coinInput, 'ETH');

    const edit = screen.getByRole('button', { name: 'Editar despesa' });
    userEvent.click(edit);

    const state2 = store.getState();
    expect(state2.wallet.editor).toBeFalsy();

    const { wallet: { expenses } } = state2;

    expect(expenses[1].description).toBe('teste2TESTE2');
    expect(expenses[1].value).toBe('15300');
    expect(expenses[1].currency).toBe('ETH');
  });
});
