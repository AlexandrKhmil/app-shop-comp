import {
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAIL,
  CATEGORY_SET_ACTIVE,
} from '../constants/action-type';

const initialState = {
  list: {},
  isLoading: false,
  isLoaded: false,
  active: null,
};

export default (state = initialState, { type, payload }) => {
  switch(type) {
    case CATEGORY_LIST_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case CATEGORY_LIST_SUCCESS: { 
      return {
        ...state,
        list: { ...payload },
        isLoading: false,
        isLoaded: true,
      };
    }
    case CATEGORY_LIST_FAIL: {
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
      };
    }
    case CATEGORY_SET_ACTIVE: {
      return {
        ...state,
        active: state.active !== payload ? payload : null,
      }
    }
    default: {
      return state;
    }
  }
}