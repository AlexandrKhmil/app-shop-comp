import axios from 'axios';
import { resMessageShow } from './message';
import {
  TAGS_LIST_REQUEST,
  TAGS_LIST_SUCCESS,
  TAGS_LIST_FAIL, 
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

// export const categoriesSetActive = (category) => ({
//   type: CATEGORIES_SET_ACTIVE,
//   payload: category,
// });

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