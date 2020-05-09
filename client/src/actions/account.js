import axios from 'axios';
import { jsonRequest } from '../functions';
import { resMessageShow } from './message';
import { modalLoginClose, modalRegClose } from './modal';
import * as actionType from '../constants/action-type';
import * as apiURL from '../constants/api-url';

export const authRequest = () => ({
  type: actionType.ACCOUNT_AUTH_REQUEST,
});

export const authSuccess = (data) => ({
  type: actionType.ACCOUNT_AUTH_SUCCESS,
  payload: data,
});

export const authFail = () => ({
  type: actionType.ACCOUNT_AUTH_FAIL,
});

export const loginRequest = () => ({ 
  type: actionType.ACCOUNT_LOGIN_REQUEST,
});

export const loginSuccess = (data) => ({ 
  type: actionType.ACCOUNT_LOGIN_SUCCESS, 
  payload: data, 
});

export const loginFail = () => ({
  type: actionType.ACCOUNT_LOGIN_FAIL,
});

export const registrationRequest = () => ({
  type: actionType.ACCOUNT_REGISTRATION_REQUEST,
})

export const registrationSuccess = (data) => ({
  type: actionType.ACCOUNT_REGISTRATION_SUCCESS,
  payload: data,
});

export const registrationFail = () => ({
  type: actionType.ACCOUNT_REGISTRATION_FAIL,
});

export const logoutUser = () => ({
  type: actionType.ACCOUNT_LOGOUT,
});

export const authUser = (token) => (dispatch) => {
  dispatch(authRequest());
  const { config } = jsonRequest({ headers: { token } });
  axios.get(apiURL.ACCOUNT_AUTH, config)
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
  axios.post(apiURL.ACCOUNT_LOGIN, body, config)
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
  dispatch(registrationRequest());
  const { config, body } = jsonRequest({ body: { email, password }});
  axios.post(apiURL.ACCOUNT_REGISTRATION, body, config)
    .then((res) => {
      dispatch(registrationSuccess(res.data));
      dispatch(modalRegClose());
    })
    .catch((error) => {
      dispatch(registrationFail());
      resMessageShow(error.response.data)(dispatch);
    });
};