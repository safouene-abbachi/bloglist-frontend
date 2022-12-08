/* eslint-disable */
import {
  GET_BLOGS,
  ADD_BLOG,
  DELETE_BLOG,
  LIKE_BLOG,
  ADD_COMMENT,
} from '../actionTypes/actionTypes';
import {
  addComment,
  addLikes,
  createNewBlog,
  deleteBlogUser,
  getAll,
} from '../../services/blogs';
import { setNotifications } from './notificationReducer';

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case GET_BLOGS:
      return action.payload;
    case ADD_BLOG:
      return [...state, action.payload];
    case DELETE_BLOG:
      return state
        .filter((blog) => blog.id !== action.payload)
        .sort((a, b) => b.likes - a.likes);
    case LIKE_BLOG:
      return state
        .map((blog) => {
          return blog.id === action.payload.id
            ? { ...action.payload, likes: blog.likes + 1 }
            : blog;
        })
        .sort((a, b) => b.likes - a.likes);
    case ADD_COMMENT:
      const { blogId, title, id: commentId } = action.payload;
      const blog = state.find((blog) => {
        return blog.id === blogId;
      });

      const newComment = { title, commentId };
      const updateBlog = { ...blog, comments: [...blog.comments, newComment] };
      return state.map((blog) => {
        return blog.id === updateBlog.id ? updateBlog : blog;
      });
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

export const newBlog = (title, author, url) => {
  return async (dispatch) => {
    const newB = await createNewBlog({ title, author, url });

    dispatch({
      type: 'ADD_BLOG',
      payload: newB,
    });
  };
};
export const deleteBlogById = (blogData) => {
  console.log('🚀 ~ blogData', blogData);
  return async (dispatch) => {
    try {
      await deleteBlogUser(blogData);
      dispatch({
        type: 'DELETE_BLOG',
        payload: blogData.id,
      });
      dispatch(
        setNotifications(
          'success',
          `blog ${blogData.title} was deleted by ${blogData.author}`,
          5
        )
      );
    } catch (error) {
      console.log('🚀 ~ error', error);
      dispatch(setNotifications('error', error.response.data, 5));
    }
  };
};

export const updateBlog = (blogData) => {
  return async (dispatch) => {
    try {
      await addLikes({
        ...blogData,
        likes: blogData.likes + 1,
      });
      dispatch({
        type: 'LIKE_BLOG',
        payload: blogData,
      });
    } catch (error) {
      console.log('🚀 ~ error', error);
      dispatch(setNotifications('error', error.response.data, 5));
    }
  };
};

export const addCommentToBlog = (title, id) => {
  return async (dispatch) => {
    const newComment = await addComment(title, id);
    console.log('🚀 ~ newComment', newComment);
    dispatch({
      type: ADD_COMMENT,
      payload: { ...newComment, blogId: id },
    });
  };
};
export default blogReducer;
