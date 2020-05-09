import {
  MESSAGE_SHOW,
} from '../constants/types';
import msgTypes from '../constants/messages';

export const messageShow = ({ type, title, text }) => ({
  type: MESSAGE_SHOW,
  payload: { type, title, text },
});

export const resMessageShow = ({ msg, errorList }) => (dispatch) => {
  if (msg) {
    dispatch(messageShow({ 
      type: msgTypes.ERROR, 
      title: 'Ошибка!', 
      text: msg 
    }));
  }
  if (errorList) {
    errorList.forEach((error) => {
      dispatch(messageShow({ 
        type: msgTypes.ERROR, 
        title: error.param, 
        text: error.msg 
      }));
    });
  }
};