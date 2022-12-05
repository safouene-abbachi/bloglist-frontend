import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/reducers/loginReducer';

const LoginForm = () => {
  const dispatch = useDispatch();
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginUser(username, password));
    setUserName('');
    setPassword('');
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUserName(target.value)}
        />
      </div>
      <div>
        password
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login_button" type="submit">
        login
      </button>
    </form>
  );
};

export default LoginForm;
