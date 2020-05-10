import axios from 'axios';
import { cartClearAll } from './cart';
import { messageShow, resMessageShow } from '../actions/message';
import { jsonRequest } from '../functions';
import * as actionType from '../constants/action-type';
import * as apiURL from '../constants/api-url';
import * as msgType from  '../constants/message-type';

export const orderListRequest = () => ({
  type: actionType.ORDER_LIST_REQUEST,
});

export const orderListSuccess = (data) => ({
  type: actionType.ORDER_LIST_SUCCESS,
  payload: data,
});

export const orderListFail = () => ({
  type: actionType.ORDER_LIST_FAIL,
});

export const orderAddRequest = () => ({
  type: actionType.ORDER_ADD_REQUEST,
});

export const orderAddSuccess = () => ({
  type: actionType.ORDER_ADD_SUCCESS,
});

export const orderAddFail = () => ({
  type: actionType.ORDER_ADD_FAIL,
});

export const orderGetList = ({ token }) => (dispatch) => {
  dispatch(orderListRequest());
  const { config } = jsonRequest({ headers: { token }});
  axios.get(apiURL.ORDER_LIST, config)
    .then((res) => {
      dispatch(orderListSuccess(res.data));
    })
    .catch((err) => {
      dispatch(orderListFail());
      dispatch(resMessageShow(err.response.data));
    });
};

export const orderAdd = ({ token, cart }) => (dispatch) => {
  dispatch(orderAddRequest());
  const { config, body } = jsonRequest({ 
    headers: { token },
    body: { cart },
  });
  axios.post(apiURL.ORDER_ADD, body, config)
    .then((res) => {
      dispatch(orderAddSuccess(res.data));
      dispatch(cartClearAll());
      dispatch(messageShow({
        type: msgType.MESSAGE_SUCCESS,
        title: 'Успех!',
        text: `Заказ поступил в систему и обрабатывается!\nНомер заказа - ${res.data.code}`,
      }));
      dispatch(orderGetList({ token }));
    })
    .catch((err) => {
      dispatch(orderAddFail());
      dispatch(resMessageShow(err.response.data));
    });
};