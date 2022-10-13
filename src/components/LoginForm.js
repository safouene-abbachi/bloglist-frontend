import React from 'react';
import { setToken } from '../services/blogs';
import login from '../services/login';
const LoginForm = ({
  username,
  password,
  setUserName,
  setPassword,
  setUser,
  setNotifType,
  setConfirmationMessage,
}) => {
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await login({ username, password });
      localStorage.setItem('user', JSON.stringify(result));
      setUser(result);
      setToken(result.token);
      setUserName('');
      setPassword('');
      setConfirmationMessage('Successfully logged-in');
      setNotifType('success');
    } catch (error) {
      console.log('🚀 ~ error', error);
      setConfirmationMessage(error.response.data.error);
      setNotifType('error');
    }
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
      <button type="submit">login</button>
    </form>
  );
};

export default LoginForm;
