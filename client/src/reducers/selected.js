import * as actionType from '../constants/action-type';

const initialState = {
  data: {},
  isLoading: false,
  isLoaded: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actionType.SELECTED_REQUEST: {
      return {
        ...state,
        data: {},
        isLoading: true,
        isLoaded: false,
      };
    }
    case actionType.SELECTED_SUCCESS: {
      return {
        ...state,
        data: payload,
        isLoading: false,
        isLoaded: true,
      };
    }
    case actionType.SELECTED_FAIL: {
      return {
        ...state,
        data: {},
        isLoading: false,
        isLoaded: true,
      };
    }
    default: {
      return state;
    }
  }
};
