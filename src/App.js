import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import NewBlog from './components/NewBlog';
import Notifications from './components/Notifications';
import { getAll, setToken } from './services/blogs';
import './App.css';
const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [notifType, setNotifType] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState('');

  useEffect(() => {
    getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const alreadyLoggedInUser = localStorage.getItem('user');
    if (alreadyLoggedInUser) {
      setUser(JSON.parse(alreadyLoggedInUser));
      setToken(JSON.parse(alreadyLoggedInUser).token);
    }
  }, []);
  const logout = () => {
    localStorage.clear();
    setUser(null);
  };
  return (
    <div>
      <Notifications
        confirmationMessage={confirmationMessage}
        notifType={notifType}
      />
      {!user ? (
        <div>
          <h1>Log into Application</h1>
          <LoginForm
            username={userName}
            password={password}
            setUserName={setUserName}
            setPassword={setPassword}
            setUser={setUser}
            setNotifType={setNotifType}
            setConfirmationMessage={setConfirmationMessage}
          />
        </div>
      ) : (
        <div>
          <button onClick={logout}>logout</button>
          <h2>blogs</h2>
          <p>{user.name} is logged-in</p>
          <NewBlog
            token={user.token}
            title={title}
            author={author}
            url={url}
            setTitle={setTitle}
            setAuthor={setAuthor}
            setUrl={setUrl}
            setNotifType={setNotifType}
            setConfirmationMessage={setConfirmationMessage}
          />
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
