import {
  MODAL_LOGIN_OPEN,
  MODAL_LOGIN_CLOSE,

  MODAL_REGISTRATION_OPEN,
  MODAL_REGISTRATION_CLOSE,

  MODAL_CART_OPEN,
  MODAL_CART_CLOSE,
} from '../constants/types';

export const modalLoginOpen = () => ({ type: MODAL_LOGIN_OPEN });

export const modalLoginClose = () => ({ type: MODAL_LOGIN_CLOSE });

export const modalRegOpen = () => ({ type: MODAL_REGISTRATION_OPEN });

export const modalRegClose = () => ({ type: MODAL_REGISTRATION_CLOSE });

export const modalCartOpen = () => ({ type: MODAL_CART_OPEN });

export const modalCartClose = () => ({ type: MODAL_CART_CLOSE });