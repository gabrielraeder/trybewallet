import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockData from './helpers/mockData';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWith';

const initialState = {
  user: {
    email: 'gabrielraeder@outlook.com.br',
  },
  wallet: {
    currencies: [],
    expenses: [],
    editor: false,
    idToEdit: 0,
    isFetching: false,
    error: '',
  },
};

const VALUE = '15';
const DESCRIPTION = 'cinema';
const COIN = 'EUR';
const METHOD = 'Dinheiro';
const CATEGORY = 'Lazer';

describe('Testa Componente WalletForm', () => {
  it('Testa os inputs e botão de walletForm', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mockData,
    }));
    const { store } = renderWithRouterAndRedux(<App />, { initialState, initialEntries: ['/carteira'] });

    const valueInput = screen.getByLabelText(/valor/i);
    const descriptionInput = screen.getByLabelText(/descrição/i);
    const coinInput = await screen.findByLabelText(/moeda/i);
    const methodInput = screen.getByLabelText(/pagamento/i);
    const categoryInput = await screen.findByTestId('tag-input');

    userEvent.type(valueInput, VALUE);
    expect(valueInput).toHaveValue(VALUE);
    userEvent.type(descriptionInput, DESCRIPTION);
    expect(descriptionInput).toHaveValue(DESCRIPTION);
    userEvent.selectOptions(coinInput, COIN);
    expect(coinInput).toHaveValue(COIN);
    userEvent.selectOptions(methodInput, METHOD);
    userEvent.selectOptions(categoryInput, CATEGORY);

    const button = screen.getByRole('button', { name: /adicionar/i });
    expect(button).toBeInTheDocument();
    userEvent.click(button);

    await waitFor(() => expect(global.fetch).toBeCalledTimes(2));

    const { wallet } = store.getState();

    expect(wallet.expenses[0].value).toBe(VALUE);
    expect(wallet.expenses[0].description).toBe(DESCRIPTION);
    expect(wallet.expenses[0].currency).toBe(COIN);
    expect(wallet.expenses[0].method).toBe(METHOD);
    expect(wallet.expenses[0].tag).toBe(CATEGORY);
  });
});
