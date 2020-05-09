import axios from 'axios';
import { jsonRequest } from '../functions';
import { resMessageShow } from './message';
import { modalLoginClose, modalRegClose } from './modal';
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

export const authRequest = () => ({
  type: ACCOUNT_AUTH_REQUEST,
});

export const authSuccess = (data) => ({
  type: ACCOUNT_AUTH_SUCCESS,
  payload: data,
});

export const authFail = () => ({
  type: ACCOUNT_AUTH_FAIL,
});

export const loginRequest = () => ({ 
  type: ACCOUNT_LOGIN_REQUEST,
});

export const loginSuccess = (data) => ({ 
  type : ACCOUNT_LOGIN_SUCCESS, 
  payload: data, 
});

export const loginFail = () => ({
  type: ACCOUNT_LOGIN_FAIL,
});

export const regRequest = () => ({
  type: ACCOUNT_REGISTRATION_REQUEST,
})

export const regSuccess = (data) => ({
  type: ACCOUNT_REGISTRATION_SUCCESS,
  payload: data,
});

export const regFail = () => ({
  type: ACCOUNT_REGISTRATION_FAIL,
});

export const logoutUser = () => ({
  type: ACCOUNT_LOGOUT,
});

export const authUser = (token) => (dispatch) => {
  dispatch(authRequest());
  const { config } = jsonRequest({ headers: { token } });
  axios.get('/api/account/auth', config)
    .then((res) => {
      dispatch(authSuccess(res.data));
    })
    .catch((error) => {
      dispatch(authFail());
      resMessageShow(error.response.data)(dispatch);
    });
};

export const loginUser = ({ email, password }) => (dispatch) => {
  dispatch(loginRequest());
  const { config, body } = jsonRequest({ body: { email, password }});
  axios.post('/api/account/login', body, config)
    .then((res) => {
      dispatch(loginSuccess(res.data));
      dispatch(modalLoginClose());
    })
    .catch((error) => {
      dispatch(loginFail());
      resMessageShow(error.ёresponse.data)(dispatch);
    });
};

export const registrationUser = ({ email, password }) => (dispatch) => {
  dispatch(regRequest());
  const { config, body } = jsonRequest({ body: { email, password }});
  axios.post('/api/account/registration', body, config)
    .then((res) => {
      dispatch(regSuccess(res.data));
      dispatch(modalRegClose());
    })
    .catch((error) => {
      dispatch(regFail());
      resMessageShow(error.response.data)(dispatch);
    });
};