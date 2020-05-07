import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
} from '../constants/types';

const initialState = {
  list: [],
  isLoading: false,
  isLoaded: false,
};

export default (state = initialState, { type, payload }) => {
  switch(type) {
    case PRODUCT_LIST_REQUEST: {
      return {
        ...state,
        isLoading: true,
        isLoaded: false
      };
    }
    case PRODUCT_LIST_SUCCESS: {
      return {
        ...state,
        list: payload,
        isLoading: false,
        isLoaded: true,
      };
    }
    case PRODUCT_LIST_FAIL: {
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
      }
    }
    default: {
      return state;
    }
  }
}