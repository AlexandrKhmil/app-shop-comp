import * as actionType from '../constants/action-type';

const initialState = {
  list: {},
  isLoading: false,
  isLoaded: false,
  active: null,
};

export default (state = initialState, { type, payload }) => {
  switch(type) {
    case actionType.TAG_LIST_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case actionType.TAG_LIST_SUCCESS: { 
      return {
        ...state,
        list: { ...payload.map((tag) => ({ tag, isActive: false })) },
        isLoading: false,
        isLoaded: true,
      };
    }
    case actionType.TAG_LIST_FAIL: {
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
      };
    }
    case actionType.TAG_SET_ACTIVE: {
      const list = Object.values(state.list).map((tag) => {
        return tag.tag === payload ? { ...tag, isActive: !tag.isActive } : tag;
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