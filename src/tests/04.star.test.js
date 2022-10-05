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
const TAG = 'Lazer';

describe('Testa Componente Header', () => {
  it('Testa se os textos estão na tela', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mockData,
    }));

    const { store } = renderWithRouterAndRedux(<App />, { initialState, initialEntries: ['/carteira'] });

    await waitFor(() => expect(global.fetch).toBeCalledTimes(1));

    const valueInput = screen.getByTestId('value-input');
    const descriptionInput = screen.getByTestId('description-input');
    const coinInput = await screen.findByTestId('currency-input');
    const methodInput = screen.getByTestId('method-input');
    const categoryInput = await screen.findByTestId('tag-input');

    userEvent.type(valueInput, VALUE);
    userEvent.type(descriptionInput, DESCRIPTION);
    userEvent.selectOptions(coinInput, COIN);
    userEvent.selectOptions(methodInput, METHOD);
    userEvent.selectOptions(categoryInput, TAG);

    expect(valueInput).toHaveValue(VALUE);

    const button = screen.getByRole('button', { name: /adicionar/i });
    expect(button).toBeInTheDocument();
    userEvent.click(button);

    await waitFor(() => expect(global.fetch).toBeCalledTimes(2));

    const total = screen.getByTestId('total-field');
    expect(Number(total.textContent)).toBeGreaterThan(0);
    const firstTotal = total.textContent;
    expect(total).toHaveTextContent('76.90');

    const value = screen.getByRole('cell', { name: '76.90' });
    expect(value.textContent).toBe('76.90');

    expect(total.textContent).toMatch(/^[0-9]*\.[0-9][0-9]$/);

    const { wallet: { expenses } } = store.getState();
    expect(expenses).toHaveLength(1);
    expect(expenses[0].id).toBe(0);

    expect(valueInput).toHaveValue('');
    expect(descriptionInput).toHaveValue('');

    userEvent.type(valueInput, VALUE);
    userEvent.type(descriptionInput, DESCRIPTION);
    userEvent.selectOptions(coinInput, COIN);
    userEvent.selectOptions(methodInput, METHOD);
    userEvent.selectOptions(categoryInput, TAG);

    userEvent.click(button);

    await waitFor(() => expect(global.fetch).toBeCalledTimes(3));

    expect(total).toHaveTextContent('153.80');
    expect(total.textContent).toMatch(/^[0-9]*\.[0-9][0-9]$/);

    expect(Number(firstTotal)).toBeLessThan(Number(total.textContent));

    const wallet2 = store.getState();

    expect(wallet2.wallet.expenses[1].id).toBe(1);

    expect(valueInput).toHaveValue('');
    expect(descriptionInput).toHaveValue('');
  });
});
