import {
  TAGS_LIST_REQUEST,
  TAGS_LIST_SUCCESS,
  TAGS_LIST_FAIL,

  TAGS_SET_ACTIVE,
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
        list: { ...payload.map((tag) => ({ tag, isActive: false })) },
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

    case TAGS_SET_ACTIVE: {
      const list = Object.values(state.list).map(({ tag, isActive }) => {
        return tag === payload 
          ? { tag, isActive: !isActive } 
          : { tag, isActive };
      }); 
      return {
        ...state,
        list: { ...list },
      };
    }
    default: {
      return state;
    }
  }
};