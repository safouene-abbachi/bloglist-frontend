/* eslint-disable */
import { getAll } from '../../services/users';
import { GET_USERS } from '../actionTypes/actionTypes';

const userReducer = (state = [], action) => {
  switch (action.type) {
    case GET_USERS:
      return action.payload;
    default:
      return state;
  }
};

export const getAllUsers = () => {
  return async (dispatch) => {
    const users = await getAll();
    dispatch({
      type: 'GET_USERS',
      payload: users,
    });
  };
};

export default userReducer;
