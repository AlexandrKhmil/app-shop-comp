import { combineReducers } from 'redux';
import message from './message';
import modal from './modal';
import account from './account';
import cart from './cart';
import category from './category';
import tag from './tag';
import product from './product';
import selected from './selected';

export default combineReducers({
  message, 
  modal,
  account, 
  cart,
  category,
  tag,
  product,
  selected,
});