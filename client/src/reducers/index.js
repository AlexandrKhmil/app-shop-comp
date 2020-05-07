import { combineReducers } from 'redux';
import message from './message';
import modal from './modal';
import account from './account';
import product from './product';

export default combineReducers({
  message, 
  modal,
  account, 
  product,
});