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

describe('Testa Componente TABLE', () => {
  it('testa titulos da tabela', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState });

    const description = screen.getByRole('columnheader', { name: /descrição/i });
    expect(description).toBeInTheDocument();
    const tag = screen.getByRole('columnheader', { name: /tag/i });
    expect(tag).toBeInTheDocument();
    const payment = screen.getByRole('columnheader', { name: /Método de pagamento/i });
    expect(payment).toBeInTheDocument();
    const value = screen.getByRole('columnheader', { name: 'Valor' });
    expect(value).toBeInTheDocument();
    const coin = screen.getByRole('columnheader', { name: 'Moeda' });
    expect(coin).toBeInTheDocument();
    const exchange = screen.getByRole('columnheader', { name: /câmbio/i });
    expect(exchange).toBeInTheDocument();
    const convertedValue = screen.getByRole('columnheader', { name: 'Valor convertido' });
    expect(convertedValue).toBeInTheDocument();
    const convertionCoin = screen.getByRole('columnheader', { name: 'Moeda de conversão' });
    expect(convertionCoin).toBeInTheDocument();
    const editExclude = screen.getByRole('columnheader', { name: 'Editar/Excluir' });
    expect(editExclude).toBeInTheDocument();
  });

  it('testa conteúdo da tabela', () => {
    // global.fetch = jest.fn(async () => ({
    //   json: async () => mockData,
    // }));

    const { store } = renderWithRouterAndRedux(<App />, { initialState, initialEntries: ['/carteira'] });

    // await waitFor(() => expect(global.fetch).toBeCalledTimes(1));
    const state = store.getState();
    const { wallet: { expenses } } = state;
    expenses.forEach((exp) => {
      const tag = screen.getByRole('cell', { name: exp.tag });
      expect(tag).toBeDefined();
      const descript = screen.getByRole('cell', { name: exp.description });
      expect(descript).toBeDefined();
      const payment = screen.getByRole('cell', { name: exp.method });
      expect(payment).toBeDefined();
      const valor = exp.value;
      const value = screen.getByRole('cell', { name: Number(valor).toFixed(2) });
      expect(value).toBeDefined();
      const coin = screen.getByRole('cell', { name: exp.exchangeRates[exp.currency].name });
      expect(coin).toBeDefined();
      const cambio = screen.getByRole('cell', { name: Number(exp.exchangeRates[exp.currency].ask).toFixed(2) });
      expect(cambio).toBeDefined();
      const convertedValue = Number(exp.value * exp.exchangeRates[exp.currency].ask);
      const converted = screen.getByRole('cell', { name: convertedValue.toFixed(2) });
      expect(converted).toBeDefined();
    });

    const convertionCoin = screen.getAllByRole('cell', { name: 'Real' });
    expect(convertionCoin).toHaveLength(3);

    const editBtns = screen.getAllByRole('button', { name: 'Editar' });
    const excludeBtns = screen.getAllByRole('button', { name: 'Excluir' });
    expect(editBtns).toHaveLength(3);
    expect(excludeBtns).toHaveLength(3);
  });

  it('Testa botão de excluir despesa', () => {
    const { store } = renderWithRouterAndRedux(<App />, { initialState, initialEntries: ['/carteira'] });

    const excludeBtns = screen.getAllByRole('button', { name: 'Excluir' });

    userEvent.click(excludeBtns[1]);

    const state = store.getState();
    const { wallet: { expenses } } = state;
    expect(expenses).toHaveLength(2);

    const tag = screen.getByRole('cell', { name: /Alimentação/i });
    const descript = screen.getByRole('cell', { name: /teste3/i });

    expect(tag).toBeInTheDocument();
    expect(descript).toBeInTheDocument();
  });
});

// describe('', () => {
//   it('', () => {

//   });
// });
