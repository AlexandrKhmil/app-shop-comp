import {
  TAGS_LIST_REQUEST,
  TAGS_LIST_SUCCESS,
  TAGS_LIST_FAIL,

  // CATEGORIES_SET_ACTIVE,
} from '../constants/types';

const initialState = {
  list: {},
  isLoading: false,
  isLoaded: false,
  active: null,
};

export default (state = initialState, { type, payload }) => {
  switch(type) {
    case TAGS_LIST_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case TAGS_LIST_SUCCESS: { 
      return {
        ...state,
        list: { ...payload },
        isLoading: false,
        isLoaded: true,
      };
    }
    case TAGS_LIST_FAIL: {
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
      };
    }

    // case CATEGORIES_SET_ACTIVE: {
    //   return {
    //     ...state,
    //     active: state.active !== payload ? payload : null,
    //   }
    // }
    default: {
      return state;
    }
  }
};