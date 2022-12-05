import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import NewBlog from './components/NewBlog';
import Notifications from './components/Notifications';
import Togglable from './components/Togglable';
import {
  deleteBlogById,
  initilizeBlogs,
  updateBlog,
} from './redux/reducers/blogReducer';
import './App.css';
import { logoutUser } from './redux/reducers/loginReducer';
const App = () => {
  const blogs = useSelector((state) => state.blogs);
  const { user } = useSelector((state) => state.login);
  console.log('🚀 ~ user', user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initilizeBlogs());
  }, []);

  const addLikesToBlog = async (blogData) => {
    dispatch(updateBlog(blogData));
    // await addLikes({
    //   ...blogData,
    //   likes: blogData.likes + 1,
    // });
    // setBlogs(
    //   blogs
    //     .map((blog) => {
    //       return blog.id === blogData.id
    //         ? { ...blogData, likes: blog.likes + 1 }
    //         : blog;
    //     })
    //     .sort((a, b) => b.likes - a.likes)
    // );
  };
  const deleteBlog = async (blogData) => {
    if (window.confirm(`Remove blog ${blogData.title} by ${blogData.author}`)) {
      dispatch(deleteBlogById(blogData));
    }
  };
  const logout = () => {
    dispatch(logoutUser());
  };
  return (
    <div>
      <Notifications />
      {!user ? (
        <div>
          <h1>Log into Application</h1>
          <LoginForm />
        </div>
      ) : (
        <div>
          <button onClick={logout}>logout</button>
          <h2>blogs</h2>
          <p>{user.name} is logged-in</p>

          <Togglable>
            <NewBlog token={user.token} />
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
