import {
  ACCOUNT_LOGIN_REQUEST,
  ACCOUNT_LOGIN_SUCCESS,
  ACCOUNT_LOGIN_FAIL,
} from '../constants/types';

const initialState = {
  email: null,
  token: null,
  isLoading: false,
  isAuth: false,
};

export default (state = initialState, { type, payload }) => {
  switch(type) {
    case ACCOUNT_LOGIN_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case ACCOUNT_LOGIN_SUCCESS: {
      return {
        ...state,
        ...payload,
        isLoading: false,
        isAuth: true,
      };
    }
    case ACCOUNT_LOGIN_FAIL: {
      return {
        ...state,
        email: null,
        token: null,
        isLoading: false,
        isAuth: false,
      };
    }

    default: {
      return state;
    }
  }
}