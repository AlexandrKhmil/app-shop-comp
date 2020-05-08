import {
  CART_ADD_PRODUCT,
  CART_REMOVE_PRODUCT,
  CART_CLEAR_PRODUCT,
} from '../constants/types';

const initialState = {
  list: {}
};

export default (state = initialState, { type, payload }) => {
  switch(type) {
    case CART_ADD_PRODUCT: {
      return {
        list: {
          ...state.list,
          [payload]: {
            quantity: state.list[payload] 
              ? state.list[payload].quantity + 1 
              : 1,
          }
        }
      }
    }
    case CART_REMOVE_PRODUCT: {

    }
    case CART_CLEAR_PRODUCT: {

    }
    default: {
      return state;
    }
  }
}