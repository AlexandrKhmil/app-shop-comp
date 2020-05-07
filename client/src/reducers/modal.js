import {
  MODAL_LOGIN_OPEN,
  MODAL_LOGIN_CLOSE,
  MODAL_REGISTRATION_OPEN,
  MODAL_REGISTRATION_CLOSE,
} from '../constants/types';

const initialState = {
  login: { isOpen: false, },
  registration: { isOpen: false},
};

export default (state = initialState, { type, payload }) => {
  switch(type) {
    case MODAL_LOGIN_OPEN: {
      return { 
        ...state, 
        login: { ...state.login, isOpen: true } 
      };
    }
    case MODAL_LOGIN_CLOSE: {
      return { 
        ...state, 
        login: { ...state.login, isOpen: false } 
      };
    }
    case MODAL_REGISTRATION_OPEN: {
      return { 
        ...state, 
        registration: { ...state.registration, isOpen: true } 
      };
    }
    case MODAL_REGISTRATION_CLOSE: {
      return { 
        ...state, 
        registration: { ...state.registration, isOpen: false } 
      };
    }
    default: {
      return state;
    }
  }
}