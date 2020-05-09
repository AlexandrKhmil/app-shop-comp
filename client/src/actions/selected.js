import axios from 'axios';
import { resMessageShow } from './message';
import * as actionType from '../constants/action-type';
import * as apiURL from '../constants/api-url';

export const selectedRequest = () => ({
  type: actionType.SELECTED_REQUEST,
});

export const selectedSuccess = (data) => ({
  type: actionType.SELECTED_SUCCESS,
  payload: data,
});

export const selectedFail = () => ({
  type: actionType.SELECTED_FAIL,
});

export const selectedGet = ({ link }) => (dispatch) => {
  console.log(1, link)
  dispatch(selectedRequest());
  axios.get(apiURL.PRODUCT_INFO(link))
    .then((res) => {
      dispatch(selectedSuccess(res.data));
    })
    .catch((err) => {
      dispatch(selectedFail());
      dispatch(resMessageShow(err.response.data));
    });
};
