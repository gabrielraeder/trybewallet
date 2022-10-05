import { DARK_MODE, LOGIN } from '../actions';

// Esse reducer será responsável por tratar as informações da pessoa usuária
const initialState = {
  email: '', // string que armazena o email da pessoa usuária
  darkMode: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      email: action.payload,
    };

  case DARK_MODE:
    return {
      ...state,
      darkMode: !state.darkMode,
    };

  default: return state;
  }
};

export default userReducer;
