import axios from 'axios';
import { jsonRequest } from '../functions';
import { modalLoginClose } from './modal';
import {
  ACCOUNT_AUTH_REQUEST,
  ACCOUNT_AUTH_SUCCESS,
  ACCOUNT_AUTH_FAIL,

  ACCOUNT_LOGIN_REQUEST,
  ACCOUNT_LOGIN_SUCCESS,
  ACCOUNT_LOGIN_FAIL,
} from '../constants/types';

const authRequest = () => ({
  type: ACCOUNT_AUTH_REQUEST,
});

const authSuccess = (data) => ({
  type: ACCOUNT_AUTH_SUCCESS,
  payload: data
});

const authFail = () => ({
  type: ACCOUNT_AUTH_FAIL,
});

const loginRequest = () => ({ 
  type: ACCOUNT_LOGIN_REQUEST,
});

const loginSuccess = (data) => ({ 
  type : ACCOUNT_LOGIN_SUCCESS, 
  payload: data, 
});

const loginFail = () => ({
  type: ACCOUNT_LOGIN_FAIL,
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
    });
}

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
    });
};