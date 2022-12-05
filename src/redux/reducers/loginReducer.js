/* eslint-disable */

import login from '../../services/login';
import { LOG_IN, LOG_OUT } from './../actionTypes/actionTypes';
import { setNotifications } from './notificationReducer';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: '',
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
      return {
        ...state,
        user: action.payload,
        token: `bearer ${action.payload.token}`,
      };
    case LOG_OUT:
      return {
        ...state,
        user: null,
        token: '',
      };
    default:
      return state;
  }
};

export const loginUser = (username, password) => {
  return async (dispatch) => {
    try {
      const result = await login({ username, password });
      localStorage.setItem('user', JSON.stringify(result));
      dispatch({
        type: 'LOG_IN',
        payload: result,
      });
      dispatch(setNotifications('success', 'Successfully logged-in', 5));
    } catch (error) {
      dispatch(setNotifications('error', error.response.data.error, 5));
    }
  };
};
export const logoutUser = () => {
  localStorage.clear();
  return {
    type: 'LOG_OUT',
  };
};
export default loginReducer;
