import * as actionType from '../constants/action-type';

export const cartAddProduct = (id) => ({ 
  type: actionType.CART_ADD_PRODUCT,
  payload: id,
});

export const cartRemoveProduct = (id) => ({
  type: actionType.CART_REMOVE_PRODUCT,
  payload: id,
});

export const cartClearProducrt = (id) => ({
  type: actionType.CART_CLEAR_PRODUCT,
  payload: id,
});

export const cartClearAll = () => ({
  type: actionType.CART_CLEAR_ALL,
});