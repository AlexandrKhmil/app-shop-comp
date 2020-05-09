import {
  CART_ADD_PRODUCT,
  CART_REMOVE_PRODUCT,
  CART_CLEAR_PRODUCT,
} from '../constants/action-type';

export const cartAddProduct = (id) => ({ 
  type: CART_ADD_PRODUCT,
  payload: id,
});

export const cartRemoveProduct = (id) => ({
  type: CART_REMOVE_PRODUCT,
  payload: id,
});

export const cartClearProducrt = (id) => ({
  type: CART_CLEAR_PRODUCT,
  payload: id,
});