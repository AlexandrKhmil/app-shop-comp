import { combineReducers } from 'redux';
import message from './message';
import modal from './modal';
import account from './account';
import cart from './cart';
import categories from './categories';
import product from './product';

export default combineReducers({
  message, 
  modal,
  account, 
  cart,
  categories,
  product,
});