import * as actionType from '../constants/action-type';

const initialState = {
  list: {},
  isLoading: false,
  isLoaded: false,
};

export default (state = initialState, { type, payload }) => {
  switch(type) {
    case actionType.ORDER_LIST_REQUEST: {
      return {
        ...state,
        isLoading: true,
        isLoaded: false,
      };
    }
    case actionType.ORDER_LIST_SUCCESS: {
      return {
        ...state,
        list: payload,
        isLoading: false,
        isLoaded: true,
      };
    }
    case actionType.ORDER_LIST_FAIL: {
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
      };
    }
    default: {
      return state;
    }
  }
}