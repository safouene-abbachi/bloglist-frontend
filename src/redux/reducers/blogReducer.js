/* eslint-disable */
import { GET_BLOGS } from '../actionTypes/actionTypes';
import { getAll } from '../../services/blogs';

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case GET_BLOGS:
      return action.payload;

    default:
      return state;
  }
};

export const initilizeBlogs = () => {
  return async (dispatch) => {
    const blogs = await getAll();
    dispatch({
      type: 'GET_BLOGS',
      payload: blogs.sort((a, b) => b.likes - a.likes),
    });
  };
};

export default blogReducer;
