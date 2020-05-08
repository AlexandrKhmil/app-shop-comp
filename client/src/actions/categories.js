import axios from 'axios';
import { resMessageShow } from './message';
import {
  CATEGORIES_LIST_REQUEST,
  CATEGORIES_LIST_SUCCESS,
  CATEGORIES_LIST_FAIL,

  CATEGORIES_SET_ACTIVE,
} from '../constants/types';

const categoriesListRequest = () => ({ 
  type: CATEGORIES_LIST_REQUEST 
});

const categoriesListSuccess = (data) => ({
  type: CATEGORIES_LIST_SUCCESS,
  payload: data,
});

const categoriesListFail = () => ({
  type: CATEGORIES_LIST_FAIL,
});

export const categoriesSetActive = (category) => ({
  type: CATEGORIES_SET_ACTIVE,
  payload: category,
});

export const getCategoriesList = () => (dispatch) => {
  dispatch(categoriesListRequest());
  axios.get('/api/product/categories')
    .then((res) => {
      dispatch(categoriesListSuccess(res.data));
    })
    .catch((error) => {
      dispatch(categoriesListFail());
      resMessageShow(error.response.data)(dispatch);
    });
}