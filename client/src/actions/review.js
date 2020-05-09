import axios from 'axios';
import { jsonRequest } from '../functions';
import { resMessageShow } from './message';
import * as actionType from '../constants/action-type';
import * as apiURL from '../constants/api-url';

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

export const reviewAdd = ({ token, link, title, text }) => (dispatch) => {
  dispatch(reviewAddRequest());
  const { config, body } = jsonRequest({ 
    headers: { token }, 
    body: { title, text, }
  });
  axios.post(apiURL.REVIEW_ADD(link), body, config)
    .then((res) => {
      dispatch(reviewAddSuccess(res.data));
    })
    .catch((err) => {
      dispatch(reviewAddFail());
      dispatch(resMessageShow(err.response.data));
    })
};