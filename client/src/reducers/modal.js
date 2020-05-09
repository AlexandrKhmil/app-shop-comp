import * as actionType from '../constants/action-type';

const initialState = {
  login: { isOpen: false, },
  registration: { isOpen: false, },
  cart: { isOpen: false, },
};

export default (state = initialState, { type, payload }) => {
  switch(type) {
    case actionType.MODAL_LOGIN_OPEN: {
      document.body.setAttribute('style', 'overflow: hidden;');
      return { 
        ...state, 
        login: { ...state.login, isOpen: true },
      };
    }
    case actionType.MODAL_LOGIN_CLOSE: {
      document.body.removeAttribute('style');
      return { 
        ...state, 
        login: { ...state.login, isOpen: false },
      };
    }

    case actionType.MODAL_REGISTRATION_OPEN: {
      document.body.setAttribute('style', 'overflow: hidden;');
      return { 
        ...state, 
        registration: { ...state.registration, isOpen: true },
      };
    }
    case actionType.MODAL_REGISTRATION_CLOSE: {
      document.body.removeAttribute('style');
      return { 
        ...state, 
        registration: { ...state.registration, isOpen: false },
      };
    }

    case actionType.MODAL_CART_OPEN: {
      document.body.setAttribute('style', 'overflow: hidden;');
      return {
        ...state,
        cart: { ...state.cart, isOpen: true },
      };
    }
    case actionType.MODAL_CART_CLOSE: {
      document.body.removeAttribute('style');
      return {
        ...state, 
        cart: { ...state.cart, isOpen: false },
      };
    }

    default: {
      return state;
    }
  }
}