import React from 'react';

const Notifications = ({ confirmationMessage, notifType }) => {
  if (confirmationMessage === '') {
    return null;
  } else {
    return <div className={notifType}>{confirmationMessage}</div>;
  }
};

export default Notifications;
