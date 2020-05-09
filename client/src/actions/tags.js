import axios from 'axios';
import { resMessageShow } from './message';
import {
  TAGS_LIST_REQUEST,
  TAGS_LIST_SUCCESS,
  TAGS_LIST_FAIL, 

  TAGS_SET_ACTIVE,
} from '../constants/types';

const tagsListRequest = () => ({ 
  type: TAGS_LIST_REQUEST 
});

const tagsListSuccess = (data) => ({
  type: TAGS_LIST_SUCCESS,
  payload: data,
});

const tagsListFail = () => ({
  type: TAGS_LIST_FAIL,
});

export const tagsSetActive = (tag) => ({
  type: TAGS_SET_ACTIVE,
  payload: tag,
});

export const getTagsList = () => (dispatch) => {
  dispatch(tagsListRequest());
  axios.get('/api/product/tags')
    .then((res) => {
      dispatch(tagsListSuccess(res.data));
    })
    .catch((error) => {
      dispatch(tagsListFail());
      resMessageShow(error.response.data)(dispatch);
    });
}