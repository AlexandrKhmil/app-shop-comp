import * as actionType from '../constants/action-type';

const initialState = {
  list: (() => {
    const cart = localStorage.getItem('cart');
    const list = cart ? JSON.parse(cart) : {};
    return list;
  })(),
};

export default (state = initialState, { type, payload }) => {
  switch(type) {
    case actionType.CART_ADD_PRODUCT: {
      const list = {
        ...state.list,
        [payload]: {
          id: payload,
          quantity: state.list[payload] ? state.list[payload].quantity + 1 : 1,
        }
      };
      localStorage.setItem('cart', JSON.stringify(list));
      return {
        ...state,
        list,
      };
    }
    case actionType.CART_REMOVE_PRODUCT: {
      // Доделать!
      const list = {
        ...state.list,
        [payload]: { quantity: 0 }
      };
      localStorage.setItem('cart', JSON.stringify(list));
      return {
        ...state,
        list, 
      };
    }
    case actionType.CART_CLEAR_PRODUCT: {
      const listWithout = Object.entries(state.list)
        .filter((product) => product[1].id !== payload);
      const list = Object.fromEntries(listWithout);
      localStorage.setItem('cart', JSON.stringify(list));
      return {
        ...state,
        list,
      }
    }

    case actionType.CART_CLEAR_ALL: {
      localStorage.removeItem('cart');
      return {
        ...state,
        list: {},
      };
    }
    default: {
      return state;
    }
  }
}