import {
  MODAL_LOGIN_OPEN,
  MODAL_LOGIN_CLOSE,
} from '../constants/types';

export const modalLoginOpen = () => ({ type: MODAL_LOGIN_OPEN });

export const modalLoginClose = () => ({ type: MODAL_LOGIN_CLOSE });
