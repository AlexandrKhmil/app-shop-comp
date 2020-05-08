import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,

  PRODUCT_PAGE_CHANGE,
  PRODUCT_PAGE_END,
} from '../constants/types';

const initialState = {
  list: {},
  offset: 0,
  didLoadedAll: false,
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
      const list = Object.fromEntries(payload.map((product) => 
        [product.id, {...product }]
      ));
      return {
        ...state,
        list: { ...state.list, ...list },
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

    case PRODUCT_PAGE_CHANGE: {
      return {
        ...state,
        offset: state.offset + payload,
      };
    }
    case PRODUCT_PAGE_END: {
      return {
        ...state,
        didLoadedAll: true,
      }
    }
    default: {
      return state;
    }
  }
}