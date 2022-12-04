/* eslint-disable */
import { SET_NOTIF, REMOVE_NOTIF } from '../actionTypes/actionTypes';
const initialState = {
  notifType: '',
  confirmationMessage: '',
};
const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NOTIF:
      clearTimeout(state.delay);
      const { confirmationMessage, notifType, delay } = action.payload;

      return {
        ...state,
        notifType,
        confirmationMessage,
        delay,
      };
    case REMOVE_NOTIF:
      return initialState;
    default:
      return state;
  }
};

export const setNotifications = (typeOfNotif, message, delay) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_NOTIF',
      payload: {
        notifType: typeOfNotif,
        confirmationMessage: message,
        delay: setTimeout(() => {
          dispatch(removeNotifications());
        }, delay * 1000),
      },
    });
  };
};

const removeNotifications = () => {
  return { type: 'REMOVE_NOTIF' };
};
export default notificationReducer;
