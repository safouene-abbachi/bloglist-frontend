import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import NewBlog from './components/NewBlog';
import Notifications from './components/Notifications';
import Togglable from './components/Togglable';
import {
  addLikes,
  createNewBlog,
  deleteBlogUser,
  setToken,
} from './services/blogs';
import { initilizeBlogs } from './redux/reducers/blogReducer';
import { setNotifications } from './redux/reducers/notificationReducer';
import './App.css';
const App = () => {
  const blogs = useSelector((state) => state.blogs);

  const dispatch = useDispatch();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  // const [notifType, setNotifType] = useState('');
  // const [confirmationMessage, setConfirmationMessage] = useState('');

  useEffect(() => {
    dispatch(initilizeBlogs());
  }, []);

  useEffect(() => {
    const alreadyLoggedInUser = localStorage.getItem('user');
    if (alreadyLoggedInUser) {
      setUser(JSON.parse(alreadyLoggedInUser));
      setToken(JSON.parse(alreadyLoggedInUser).token);
    }
  }, []);
  const addBlog = async (e, title, author, url) => {
    e.preventDefault();
    try {
      await createNewBlog({ title, author, url });
      dispatch(initilizeBlogs());
      dispatch(
        setNotifications(
          'success',
          `a new blog ${title} was added by ${author}`,
          5
        )
      );

      // dispatch({
      //   type: 'SET_NOTIF',
      //   payload: {
      //     notifType: 'success',
      //     confirmationMessage: `a new blog ${title} was added by ${author}`,
      //   },
      // });
    } catch (error) {
      dispatch({
        type: 'SET_NOTIF',
        payload: {
          notifType: 'error',
          confirmationMessage: error,
        },
      });
    }
  };
  const addLikesToBlog = async (blogData) => {
    try {
      await addLikes({
        ...blogData,
        likes: blogData.likes + 1,
      });
      // setBlogs(
      //   blogs
      //     .map((blog) => {
      //       return blog.id === blogData.id
      //         ? { ...blogData, likes: blog.likes + 1 }
      //         : blog;
      //     })
      //     .sort((a, b) => b.likes - a.likes)
      // );
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
        // setBlogs(
        //   blogs
        //     .filter((blog) => blog.id !== blogData.id)
        //     .sort((a, b) => b.likes - a.likes)
        // );
        // setConfirmationMessage(
        //   `blog ${blogData.title} was deleted by ${blogData.author}`
        // );
        // setNotifType('success');
      }
    } catch (error) {
      // setConfirmationMessage(error);
      // setNotifType('error');
    }
  };
  const logout = () => {
    localStorage.clear();
    setUser(null);
  };
  return (
    <div>
      <Notifications />
      {!user ? (
        <div>
          <h1>Log into Application</h1>
          <LoginForm
            username={userName}
            password={password}
            setUserName={setUserName}
            setPassword={setPassword}
            setUser={setUser}
            // setNotifType={setNotifType}
            // setConfirmationMessage={setConfirmationMessage}
          />
        </div>
      ) : (
        <div>
          <button onClick={logout}>logout</button>
          <h2>blogs</h2>
          <p>{user.name} is logged-in</p>

          <Togglable>
            <NewBlog token={user.token} addBlog={addBlog} />
          </Togglable>
          <div className="blogList">
            {blogs?.map((blog) => (
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
