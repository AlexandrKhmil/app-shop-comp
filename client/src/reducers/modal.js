import {
  MODAL_LOGIN_OPEN,
  MODAL_LOGIN_CLOSE,
} from '../constants/types';

const initialState = {
  login: { isOpen: false, },
};

export default (state = initialState, { type, payload }) => {
  switch(type) {
    case MODAL_LOGIN_OPEN: {
      return { ...state, login: { ...state.login, isOpen: true } };
    }
    case MODAL_LOGIN_CLOSE: {
      return { ...state, login: { ...state.login, isOpen: false } };
    }
    default: {
      return state;
    }
  }
}