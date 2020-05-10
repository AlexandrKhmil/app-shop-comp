import axios from 'axios';
import { jsonRequest } from '../functions';
import { messageShow, resMessageShow } from './message';
import * as actionType from '../constants/action-type';
import * as apiURL from '../constants/api-url';
import * as msgType from '../constants/message-type';

export const reviewListRequest = () => ({
  type: actionType.REVIEW_LIST_REQUEST,
});

export const reviewListSuccess = (data) => ({
  type: actionType.REVIEW_LIST_SUCCESS,
  payload: data,
});

export const reviewListFail = () => ({
  type: actionType.REVIEW_LIST_FAIL,
});

export const reviewAddRequest = () => ({
  type: actionType.REVIEW_ADD_REQUEST,
});

export const reviewAddSuccess = (data) => ({
  type: actionType.REVIEW_ADD_SUCCESS,
  payload: data,
});

export const reviewAddFail = () => ({
  type: actionType.REVIEW_ADD_FAIL,
});

export const reviewGetList = ({ link }) => (dispatch) => {
  dispatch(reviewListRequest());
  const { config } = jsonRequest({ headers: { link }});
  axios.get(apiURL.REVIEW_GET(link), config)
    .then((res) => {
      dispatch(reviewListSuccess(res.data));
    })
    .catch((err) => {
      dispatch(reviewListFail());
      dispatch(resMessageShow(err.response.data));
    })
};

export const reviewAdd = ({ token, link, title, text }) => (dispatch) => {
  dispatch(reviewAddRequest());
  const { config, body } = jsonRequest({ 
    headers: { token }, 
    body: { title, text, }
  });
  axios.post(apiURL.REVIEW_ADD(link), body, config)
    .then((res) => {
      dispatch(reviewAddSuccess(res.data));
      dispatch(messageShow({
        type: msgType.MESSAGE_SUCCESS,
        title: 'Успех!',
        text: 'Ваш отзыв оставлен!',
      }));
    })
    .then(() => {
      reviewGetList({ link })(dispatch);
    })
    .catch((err) => {
      dispatch(reviewAddFail());
      dispatch(resMessageShow(err.response.data));
    })
};