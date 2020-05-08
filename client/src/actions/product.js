import axios from 'axios';
import { resMessageShow } from './message';
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
} from '../constants/types';

const productListRequest = () => ({
  type: PRODUCT_LIST_REQUEST,
});

const productListSuccess = (data) => ({
  type: PRODUCT_LIST_SUCCESS,
  payload: data,
});

const productListFail = () => ({
  type: PRODUCT_LIST_FAIL,
});

export const getProductList = () => (dispatch) => {
  dispatch(productListRequest());
  axios.get('api/product/list')
    .then((res) => {
      dispatch(productListSuccess(res.data));
    })
    .catch((error) => {
      dispatch(productListFail());
      resMessageShow(error.response.data)(dispatch);
    })
};