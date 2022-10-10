import React, { useState } from 'react';

const Togglable = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <>
      <button
        className="newBlog"
        style={hideWhenVisible}
        onClick={toggleVisibility}
        type="submit"
      >
        new blog
      </button>
      <div style={showWhenVisible}>
        {children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </>
  );
};

export default Togglable;
