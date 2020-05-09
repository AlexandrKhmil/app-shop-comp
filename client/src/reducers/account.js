import {
  ACCOUNT_AUTH_REQUEST,
  ACCOUNT_AUTH_SUCCESS,
  ACCOUNT_AUTH_FAIL,

  ACCOUNT_LOGIN_REQUEST,
  ACCOUNT_LOGIN_SUCCESS,
  ACCOUNT_LOGIN_FAIL,

  ACCOUNT_REGISTRATION_REQUEST,
  ACCOUNT_REGISTRATION_SUCCESS,
  ACCOUNT_REGISTRATION_FAIL,

  ACCOUNT_LOGOUT,
} from '../constants/action-type';

const initialState = {
  email: null,
  token: localStorage.getItem('token'),
  isLoading: false,
  isAuth: false,
};

export default (state = initialState, { type, payload }) => {
  switch(type) {
    case ACCOUNT_AUTH_REQUEST: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case ACCOUNT_AUTH_SUCCESS: { 
      return {
        ...state,
        ...payload,
        isLoading: false,
        isAuth: true,
      }
    }
    case ACCOUNT_AUTH_FAIL: {
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isLoading: false,
      }
    }

    case ACCOUNT_LOGIN_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case ACCOUNT_LOGIN_SUCCESS: {
      localStorage.setItem('token', payload.token);
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

    case ACCOUNT_REGISTRATION_REQUEST: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case ACCOUNT_REGISTRATION_SUCCESS: {
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isLoading: false,
        isAuth: true,
      };
    }
    case ACCOUNT_REGISTRATION_FAIL: {
      return {
        ...state,
        email: null,
        token: null,
        isLoading: false,
        isAuth: false,
      };
    }

    case ACCOUNT_LOGOUT: {
      localStorage.removeItem('token');
      return {
        ...state,
        email: null,
        token: null,
        isLoading: false,
        isAuth: false,
      }
    }

    default: {
      return state;
    }
  }
}