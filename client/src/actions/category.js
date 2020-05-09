import axios from 'axios';
import { resMessageShow } from './message';
import * as actionType from '../constants/action-type';
import * as apiURL from '../constants/api-url';

export const categoryListRequest = () => ({ 
  type: actionType.CATEGORY_LIST_REQUEST, 
});

export const categoryListSuccess = (data) => ({
  type: actionType.CATEGORY_LIST_SUCCESS,
  payload: data,
});

export const categoryListFail = () => ({
  type: actionType.CATEGORY_LIST_FAIL,
});

export const categorySetActive = (category) => ({
  type: actionType.CATEGORY_SET_ACTIVE,
  payload: category,
});

export const categoryGetList = () => (dispatch) => {
  dispatch(categoryListRequest());
  axios.get(apiURL.CATEGORY_LIST)
    .then((res) => {
      dispatch(categoryListSuccess(res.data));
    })
    .catch((error) => {
      dispatch(categoryListFail());
      resMessageShow(error.response.data)(dispatch);
    });
};