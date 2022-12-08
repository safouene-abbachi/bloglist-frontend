import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/reducers/loginReducer';
const NavBar = () => {
  const { user } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(logoutUser());
  };
  return (
    <div className="navbar">
      <Link to="/blogs">
        <h2>blogs</h2>{' '}
      </Link>
      <Link to="/users">
        <h2>users</h2>{' '}
      </Link>
      <h1>{user.name} is logged-in</h1>
      <button height="25px" onClick={logout}>
        logout
      </button>
    </div>
  );
};

export default NavBar;
