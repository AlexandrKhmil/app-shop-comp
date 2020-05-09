import axios from 'axios';
import { jsonRequest } from '../functions';
import { resMessageShow } from './message';
import * as actionType from '../constants/action-type';
import * as apiURL from '../constants/api-url';

export const productListRequest = () => ({
  type: actionType.PRODUCT_LIST_REQUEST,
});

export const productListSuccess = (data) => ({
  type: actionType.PRODUCT_LIST_SUCCESS,
  payload: data,
});

export const productListFail = () => ({
  type: actionType.PRODUCT_LIST_FAIL,
});

export const productPageChange = (offset) => ({
  type: actionType.PRODUCT_PAGE_CHANGE,
  payload: offset,
});

export const productPageEnd = () => ({
  type: actionType.PRODUCT_PAGE_END,
});

export const productSetSort = (sortType) => ({
  type: actionType.PRODUCT_SET_SORT,
  payload: sortType,
});

export const productGetList = ({ 
    limit = 9, 
    offset,
  } = { limit: 9, offset: 0 }
) => (dispatch) => {
  dispatch(productListRequest());
  const { config } = jsonRequest({ headers: { limit, offset } });
  axios.get(apiURL.PRODUCT_LIST, config)
    .then((res) => {
      dispatch(productListSuccess(res.data));
      dispatch(productPageChange(res.data.length));
      if (res.data.length < limit) {
        dispatch(productPageEnd());
      }
    })
    .catch((err) => {
      dispatch(productListFail());
      dispatch(resMessageShow(err.response.data));
    })
};