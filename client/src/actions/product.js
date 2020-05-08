import axios from 'axios';
import { jsonRequest } from '../functions';
import { resMessageShow } from './message';
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,

  PRODUCT_PAGE_CHANGE,
  PRODUCT_PAGE_END,
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

const productPageChange = (offset) => ({
  type: PRODUCT_PAGE_CHANGE,
  payload: offset,
});

const productPageEnd = () => ({
  type: PRODUCT_PAGE_END,
})

export const getProductList = (
  { 
    limit = 9, 
    offset, 
  } = { limit: 9, offset: 0}
) => (dispatch) => {
  dispatch(productListRequest());
  const { config } = jsonRequest({ headers: { limit, offset } });
  axios.get('api/product/list', config)
    .then((res) => {
      dispatch(productListSuccess(res.data));
      dispatch(productPageChange(res.data.length));
      if (res.data.length < limit) {
        dispatch(productPageEnd());
      }
    })
    .catch((error) => {
      dispatch(productListFail());
      resMessageShow(error.response.data)(dispatch);
    })
};