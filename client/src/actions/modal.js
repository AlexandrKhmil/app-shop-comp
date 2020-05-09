import * as actionType from '../constants/action-type';

export const modalLoginOpen = () => ({ 
  type: actionType.MODAL_LOGIN_OPEN, 
});

export const modalLoginClose = () => ({ 
  type: actionType.MODAL_LOGIN_CLOSE, 
});

export const modalRegOpen = () => ({ 
  type: actionType.MODAL_REGISTRATION_OPEN, 
});

export const modalRegClose = () => ({ 
  type: actionType.MODAL_REGISTRATION_CLOSE, 
});

export const modalCartOpen = () => ({ 
  type: actionType.MODAL_CART_OPEN, 
});

export const modalCartClose = () => ({ 
  type: actionType.MODAL_CART_CLOSE, 
});