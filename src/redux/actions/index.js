import { requiredStateCurrValues, getCurrencies } from '../../services/API';

// Coloque aqui suas actions
export const LOGIN = 'LOGIN';
export const ADD_WALLET = 'ADD_WALLET';
export const REQUEST_API = 'REQUEST_API';
export const SUCCESS_API = 'SUCCESS_API';
export const FAILURE_API = 'FAILURE_API';
export const SUCCESS_EXCHANGE_RATE = 'SUCCESS_EXCHANGE_RATE';
export const REMOVE_WALLET = 'REMOVE_WALLET';
export const BEGIN_EDIT_WALLET = 'BEGIN_EDIT_WALLET';
export const EDIT_WALLET = 'EDIT_WALLET';
export const DARK_MODE = 'DARK_MODE';

export const loginAction = (payload) => ({ type: LOGIN, payload });

export const darkModeAction = () => ({ type: DARK_MODE });

const requestAction = () => ({ type: REQUEST_API });

const successAPIAction = (payload) => ({ type: SUCCESS_API, payload });

const failureAPIAction = (error) => ({ type: FAILURE_API, payload: { error } });

export const fetchCurrencyAPI = () => (
  async (dispatch) => {
    dispatch(requestAction());
    try {
      const currencies = await requiredStateCurrValues();
      dispatch(successAPIAction(currencies));
    } catch (error) {
      dispatch(failureAPIAction(error));
    }
  }
);

const successAddtoWalletAction = (payload) => ({ type: SUCCESS_EXCHANGE_RATE, payload });

export const fetchExchangeRates = (payload) => (
  async (dispatch) => {
    dispatch(requestAction());
    try {
      const exchangeRates = await getCurrencies();
      dispatch(successAddtoWalletAction({ ...payload, exchangeRates }));
    } catch (error) {
      dispatch(failureAPIAction(error));
    }
  }
);

export const removeFromWalletAction = (payload) => ({ type: REMOVE_WALLET, payload });

export const editWalletAction = (payload) => ({ type: BEGIN_EDIT_WALLET, payload });

export const finishEditAction = (payload) => ({ type: EDIT_WALLET, payload });
