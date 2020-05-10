import * as actionType from '../constants/action-type';

const initialState = {
  data: {},
  isLoading: false,
  isLoaded: false,
  isReviewLoading: false,
  isReviewLoaded: true,
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

    case actionType.REVIEW_LIST_REQUEST: {
      return {
        ...state,
        isReviewLoading: true,
        isReviewLoaded: false,
      };
    }
    case actionType.REVIEW_LIST_SUCCESS: {
      return {
        ...state,
        data: {
          ...state.data,
          review_list: payload
        },
        isReviewLoading: false,
        isReviewLoaded: true,
      };
    }
    case actionType.REVIEW_LIST_FAIL: {
      return {
        ...state,
        isReviewLoading: false,
        isReviewLoaded: true,
      };
    }
    default: {
      return state;
    }
  }
};
