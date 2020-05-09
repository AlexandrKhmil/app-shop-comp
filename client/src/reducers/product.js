import * as actionType from '../constants/action-type';
import { DATE_DESC } from '../constants/sort-type';

const initialState = {
  list: {},
  offset: 0,
  didLoadedAll: false,
  isLoading: false,
  isLoaded: false,
  sortType: DATE_DESC,
};

export default (state = initialState, { type, payload }) => {
  switch(type) {
    case actionType.PRODUCT_LIST_REQUEST: {
      return {
        ...state,
        isLoading: true,
        isLoaded: false
      };
    }
    case actionType.PRODUCT_LIST_SUCCESS: {
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
    case actionType.PRODUCT_LIST_FAIL: {
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
      }
    }

    case actionType.PRODUCT_PAGE_CHANGE: {
      return {
        ...state,
        offset: state.offset + payload,
      };
    }
    case actionType.PRODUCT_PAGE_END: {
      return {
        ...state,
        didLoadedAll: true,
      }
    }

    case actionType.PRODUCT_SET_SORT: {
      return {
        ...state,
        sortType: payload,
      }
    }

    default: {
      return state;
    }
  }
}