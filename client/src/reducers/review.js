import * as actionType from '../constants/action-type';

const initialState = {
  isLoading: false,
  isLoaded: false,
};

export default (state = initialState, { type, payload }) => {
  switch(type) {
    case actionType.REVIEW_ADD_REQUEST: {
      return {
        ...state,
        isLoading: true,
        isLoaded: false,
      }
    }
    case actionType.REVIEW_ADD_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
      }
    }
    case actionType.REVIEW_ADD_FAIL: {
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