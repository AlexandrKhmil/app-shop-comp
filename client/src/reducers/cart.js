import {
  CART_ADD_PRODUCT,
  CART_REMOVE_PRODUCT,
  CART_CLEAR_PRODUCT,
} from '../constants/types';

const initialState = {
  list: { 
    2: { id: 2, quantity: 1},
    1: { id: 1, quantity: 1},
  }
};

export default (state = initialState, { type, payload }) => {
  switch(type) {
    case CART_ADD_PRODUCT: {
      return {
        ...state,
        list: {
          ...state.list,
          [payload]: {
            id: payload,
            quantity: state.list[payload] 
              ? state.list[payload].quantity + 1 
              : 1,
          }
        }
      };
    }
    case CART_REMOVE_PRODUCT: {
      return {
        ...state,
        list: {
          ...state.list,
          [payload]: {
            quantity: 0
          }
        }
      }
    }
    case CART_CLEAR_PRODUCT: {
      const listWithout = Object.entries(state.list)
        .filter((product) => product[1].id !== payload);
      return {
        ...state,
        list: Object.fromEntries(listWithout),
      }
    }
    default: {
      return state;
    }
  }
}