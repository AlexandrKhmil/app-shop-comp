import axios from 'axios';
import { resMessageShow } from './message';
import {
  TAG_LIST_REQUEST,
  TAG_LIST_SUCCESS,
  TAG_LIST_FAIL, 
  TAG_SET_ACTIVE,
} from '../constants/action-type';

export const tagListRequest = () => ({ 
  type: TAG_LIST_REQUEST 
});

export const tagListSuccess = (data) => ({
  type: TAG_LIST_SUCCESS,
  payload: data,
});

export const tagListFail = () => ({
  type: TAG_LIST_FAIL,
});

export const tagSetActive = (tag) => ({
  type: TAG_SET_ACTIVE,
  payload: tag,
});

export const getTagList = () => (dispatch) => {
  dispatch(tagListRequest());
  axios.get('/api/product/tags')
    .then((res) => {
      dispatch(tagListSuccess(res.data));
    })
    .catch((error) => {
      dispatch(tagListFail());
      resMessageShow(error.response.data)(dispatch);
    });
};