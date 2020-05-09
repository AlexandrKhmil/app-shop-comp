import axios from 'axios';
import { resMessageShow } from './message';
import * as actionType from '../constants/action-type';
import * as apiURL from '../constants/api-url';

export const tagListRequest = () => ({ 
  type: actionType.TAG_LIST_REQUEST 
});

export const tagListSuccess = (data) => ({
  type: actionType.TAG_LIST_SUCCESS,
  payload: data,
});

export const tagListFail = () => ({
  type: actionType.TAG_LIST_FAIL,
});

export const tagSetActive = (tag) => ({
  type: actionType.TAG_SET_ACTIVE,
  payload: tag,
});

export const tagGetList = () => (dispatch) => {
  dispatch(tagListRequest());
  axios.get(apiURL.TAG_LIST)
    .then((res) => {
      dispatch(tagListSuccess(res.data));
    })
    .catch((error) => {
      dispatch(tagListFail());
      resMessageShow(error.response.data)(dispatch);
    });
};