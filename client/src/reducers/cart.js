import * as actionType from '../constants/action-type';

const initialState = {
  list: {}
};

export default (state = initialState, { type, payload }) => {
  switch(type) {
    case actionType.CART_ADD_PRODUCT: {
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
    case actionType.CART_REMOVE_PRODUCT: {
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
    case actionType.CART_CLEAR_PRODUCT: {
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