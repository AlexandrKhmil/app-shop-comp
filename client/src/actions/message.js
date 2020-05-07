import {
  MESSAGE_SHOW,
} from '../constants/types';

export const messageShow = ({ type, title, text }) => ({
  type: MESSAGE_SHOW,
  payload: { type, title, text },
});

export const resMessageShow = ({ msg, errorList }) => (dispatch) => {
  if (msg) {
    dispatch(messageShow({ 
      type: 'error', 
      title: 'Ошибка!', 
      text: msg 
    }));
  }
  if (errorList) {
    errorList.forEach((validationError) => {
      dispatch(messageShow({ 
        type: 'error', 
        title: validationError.param, 
        text: validationError.msg 
      }));
    });
  }
};