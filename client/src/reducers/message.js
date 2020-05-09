import {
  MESSAGE_SHOW,
} from '../constants/action-type';

const initialState = {
  type: null,
  title: null,
  text: null,
};

export default (state = initialState, { type, payload }) => {
  switch(type) {
    case MESSAGE_SHOW: {
      return {
        ...state,
        ...payload,
      }
    }
    default: {
      return state;
    }
  }
}