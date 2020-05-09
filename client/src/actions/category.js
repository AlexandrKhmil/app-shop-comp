import axios from 'axios';
import { resMessageShow } from './message';
import {
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAIL,
  CATEGORY_SET_ACTIVE,
} from '../constants/action-type';

export const categoryListRequest = () => ({ 
  type: CATEGORY_LIST_REQUEST, 
});

export const categoryListSuccess = (data) => ({
  type: CATEGORY_LIST_SUCCESS,
  payload: data,
});

export const categoryListFail = () => ({
  type: CATEGORY_LIST_FAIL,
});

export const categorySetActive = (category) => ({
  type: CATEGORY_SET_ACTIVE,
  payload: category,
});

export const getCategoryList = () => (dispatch) => {
  dispatch(categoryListRequest());
  axios.get('/api/product/categories')
    .then((res) => {
      dispatch(categoryListSuccess(res.data));
    })
    .catch((error) => {
      dispatch(categoryListFail());
      resMessageShow(error.response.data)(dispatch);
    });
};