import {
  MESSAGE_SHOW,
} from '../constants/action-type';
import { MESSAGE_ERROR } from '../constants/message-type';

export const messageShow = ({ type, title, text }) => ({
  type: MESSAGE_SHOW,
  payload: { type, title, text },
});

export const resMessageShow = ({ msg, errorList }) => (dispatch) => {
  if (msg) {
    dispatch(messageShow({ 
      type: MESSAGE_ERROR, 
      title: 'Ошибка!', 
      text: msg, 
    }));
  }
  if (errorList) {
    errorList.forEach((error) => {
      dispatch(messageShow({ 
        type: MESSAGE_ERROR, 
        title: error.param, 
        text: error.msg, 
      }));
    });
  }
};