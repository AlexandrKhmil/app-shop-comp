import axios from 'axios';
import { jsonRequest } from '../functions';
import { modalLoginClose } from './modal';
import {
  ACCOUNT_LOGIN_REQUEST,
  ACCOUNT_LOGIN_SUCCESS,
  ACCOUNT_LOGIN_FAIL,
} from '../constants/types';

export const loginRequest = () => ({ 
  type: ACCOUNT_LOGIN_REQUEST,
});

export const loginSuccess = (data) => ({ 
  type : ACCOUNT_LOGIN_SUCCESS, 
  payload: data, 
});

export const loginFail = () => ({
  type: ACCOUNT_LOGIN_FAIL,
})

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