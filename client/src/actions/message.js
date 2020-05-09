import * as actionType from '../constants/action-type';
import * as msgType from '../constants/message-type';

export const messageShow = ({ type, title, text }) => ({
  type: actionType.MESSAGE_SHOW,
  payload: { type, title, text },
});

export const resMessageShow = ({ msg, errorList }) => (dispatch) => {
  if (msg) {
    dispatch(messageShow({ 
      type: msgType.MESSAGE_ERROR, 
      title: 'Ошибка!', 
      text: msg, 
    }));
  }
  if (errorList) {
    errorList.forEach((error) => {
      dispatch(messageShow({ 
        type: msgType.MESSAGE_ERROR, 
        title: error.param, 
        text: error.msg, 
      }));
    });
  }
};