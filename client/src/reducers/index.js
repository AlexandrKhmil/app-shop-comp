import { combineReducers } from 'redux';
import modal from './modal';
import account from './account';

export default combineReducers({ 
  modal,
  account, 
});