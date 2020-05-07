import { combineReducers } from 'redux';
import message from './message';
import modal from './modal';
import account from './account';

export default combineReducers({
  message, 
  modal,
  account, 
});