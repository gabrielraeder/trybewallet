import {
  FAILURE_API,
  SUCCESS_API,
  REQUEST_API,
  SUCCESS_EXCHANGE_RATE,
  REMOVE_WALLET,
  BEGIN_EDIT_WALLET,
  EDIT_WALLET,
} from '../actions';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const initialState = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  isFetching: false,
  error: '',
};

const filterEditExpenses = (state, action) => {
  const { expenses, idToEdit } = state;
  const old = expenses.filter((exp) => exp.id === idToEdit);
  const removeOld = expenses.filter((exp) => exp.id !== idToEdit);
  const [oldOne] = old;
  const editOld = { ...oldOne, ...action.payload };
  removeOld.splice(idToEdit, 0, editOld);
  return removeOld;
};

const AddSequentialId = (state) => {
  const { expenses } = state;
  return expenses.length === 0 ? 0 : expenses[expenses.length - 1].id + 1;
};

const walletReducer = (state = initialState, action) => {
  switch (action.type) {
  case REQUEST_API: return {
    ...state,
    isFetching: true,
  };
  case SUCCESS_API:
    return {
      ...state,
      currencies: action.payload.currencies,
      isFetching: false,
      error: '',
    };
  case SUCCESS_EXCHANGE_RATE:
    return {
      ...state,
      isFetching: false,
      error: '',
      expenses: [...state.expenses, { id: AddSequentialId(state), ...action.payload }],
    };

  case FAILURE_API: return {
    ...state,
    isFetching: false,
    error: action.payload.error,
  };

  case REMOVE_WALLET:
    return {
      ...state,
      expenses: state.expenses.filter((exp) => exp.id !== action.payload),
    };

  case BEGIN_EDIT_WALLET:
    return {
      ...state,
      idToEdit: action.payload,
      editor: true,
    };

  case EDIT_WALLET:
    return {
      ...state,
      editor: false,
      expenses: filterEditExpenses(state, action),
    };

  default: return state;
  }
};

export default walletReducer;
