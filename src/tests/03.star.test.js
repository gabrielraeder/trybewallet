import React from 'react';
import { screen, waitFor } from '@testing-library/react';
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

describe('STARTEST WalletForm', () => {
  it('Testa os inputs', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mockData,
    }));
    renderWithRouterAndRedux(<App />, { initialState, initialEntries: ['/carteira'] });

    const valueInput = screen.getByTestId('value-input');
    const descriptionInput = screen.getByTestId('description-input');
    const coinInput = await screen.findByTestId('currency-input');
    const methodInput = screen.getByTestId('method-input');
    const categoryInput = await screen.findByTestId('tag-input');

    expect(valueInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(coinInput).toBeInTheDocument();
    expect(methodInput).toBeInTheDocument();
    expect(categoryInput).toBeInTheDocument();

    expect(global.fetch).toBeCalledWith('https://economia.awesomeapi.com.br/json/all');
    expect(global.fetch).toBeCalledTimes(1);

    const cashOpt = screen.getByRole('option', { name: 'Dinheiro' });
    expect(cashOpt).toBeInTheDocument();
    const debitOpt = screen.getByRole('option', { name: 'Cartão de débito' });
    expect(debitOpt).toBeInTheDocument();
    const creditOpt = screen.getByRole('option', { name: 'Cartão de crédito' });
    expect(creditOpt).toBeInTheDocument();

    const alimentacao = screen.getByRole('option', { name: /alimentação/i });
    expect(alimentacao).toBeInTheDocument();
    const lazer = screen.getByRole('option', { name: /Lazer/i });
    expect(lazer).toBeInTheDocument();
    const trabalho = screen.getByRole('option', { name: /Trabalho/i });
    expect(trabalho).toBeInTheDocument();
    const transporte = screen.getByRole('option', { name: /transporte/i });
    expect(transporte).toBeInTheDocument();
    const saude = screen.getByRole('option', { name: /saúde/i });
    expect(saude).toBeInTheDocument();
  });

  it('testa se currencies estão sendo salvas na store', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mockData,
    }));
    const { store } = renderWithRouterAndRedux(<App />, { initialState, initialEntries: ['/carteira'] });

    await waitFor(() => expect(global.fetch).toBeCalledTimes(1));

    const { wallet: { currencies } } = store.getState();
    expect(currencies).toHaveLength(15);
  });
});
