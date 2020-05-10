import axios from 'axios';
import { jsonRequest } from '../functions';
import { messageShow, resMessageShow } from './message';
import * as actionType from '../constants/action-type';
import * as apiURL from '../constants/api-url';
import * as msgType from '../constants/message-type';

export const rateGetRequest = () => ({
  type: actionType.RATE_GET_REQUEST,
});

export const rateGetSuccess = (data) => ({
  type: actionType.RATE_GET_SUCCESS,
  payload: data,
});

export const rateGetFail = () => ({
  type: actionType.RATE_GET_FAIL,
});

export const rateAddRequest = () => ({
  type: actionType.RATE_ADD_REQUEST,
});

export const rateAddSuccess = () => ({
  type: actionType.RATE_ADD_SUCCESS,
});

export const rateAddFail =() => ({
  type: actionType.RATE_ADD_FAIL,
});

export const rateGet = ({ link, }) => (dispatch) => {
  dispatch(rateGetRequest());
  const { config } = jsonRequest({ headers: { link, }, });
  axios.get(apiURL.RATE_GET(link), config)
    .then((res) => {
      dispatch(rateGetSuccess(res.data));
    })
    .catch((err) => {
      dispatch(rateGetFail());
      dispatch(resMessageShow(err.response.data));
    });
};

export const rateAdd = ({ token, link, value }) => (dispatch) => {
  dispatch(rateAddRequest());
  const { config, body } = jsonRequest({
    headers: { token, },
    body: { value, },
  });
  axios.post(apiURL.RATE_ADD(link), body, config)
    .then(() => {
      dispatch(rateAddSuccess());
      dispatch(messageShow({
        type: msgType.MESSAGE_SUCCESS,
        title: 'Успех!',
        text: 'Ваша оценка учтена!',
      }));
    })
    .then(() => {
      dispatch(rateGet({link}));
    })
    .catch((err) => {
      dispatch(rateAddFail());
      dispatch(resMessageShow(err.response.data));
    });
};