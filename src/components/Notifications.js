import React from 'react';
import { useSelector } from 'react-redux';
const Notifications = () => {
  const { confirmationMessage, notifType } = useSelector(
    (state) => state.notifications
  );
  if (confirmationMessage === '') {
    return null;
  } else {
    return <div className={notifType}>{confirmationMessage}</div>;
  }
};

export default Notifications;
