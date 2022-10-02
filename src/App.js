import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import NewBlog from './components/NewBlog';
import Notifications from './components/Notifications';
import { addLikes, deleteBlogUser, getAll, setToken } from './services/blogs';
import './App.css';
const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [visibleBlogForm, setVisibleBLogForm] = useState(false);
  const [notifType, setNotifType] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState('');

  const showNewBlogForm = { display: !visibleBlogForm ? 'none' : '' };

  useEffect(() => {
    getAll().then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)));
  }, []);

  useEffect(() => {
    const alreadyLoggedInUser = localStorage.getItem('user');
    if (alreadyLoggedInUser) {
      setUser(JSON.parse(alreadyLoggedInUser));
      setToken(JSON.parse(alreadyLoggedInUser).token);
    }
  }, []);

  const addLikesToBlog = async (blogData) => {
    try {
      await addLikes({
        ...blogData,
        likes: blogData.likes + 1,
      });
      setBlogs(
        blogs
          .map((blog) => {
            return blog.id === blogData.id
              ? { ...blogData, likes: blog.likes + 1 }
              : blog;
          })
          .sort((a, b) => b.likes - a.likes)
      );
    } catch (error) {
      console.log(error);
    }
  };
  const deleteBlog = async (blogData) => {
    try {
      if (
        window.confirm(`Remove blog ${blogData.title} by ${blogData.author}`)
      ) {
        console.log('here');
        await deleteBlogUser(blogData);
        setConfirmationMessage(
          `blog ${blogData.title} was deleted by ${blogData.author}`
        );
        setNotifType('success');
      }
    } catch (error) {
      setConfirmationMessage(error);
      setNotifType('error');
    }
  };
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
          <button onClick={() => setVisibleBLogForm(true)} type="submit">
            new blog
          </button>
          <div style={showNewBlogForm}>
            <NewBlog
              token={user.token}
              setNotifType={setNotifType}
              setConfirmationMessage={setConfirmationMessage}
              setVisibleBLogForm={setVisibleBLogForm}
            />
            {blogs.map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                addLikesToBlog={addLikesToBlog}
                user={user}
                deleteBlog={deleteBlog}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
