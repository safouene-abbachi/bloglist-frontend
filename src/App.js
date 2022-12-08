import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Blogs from './components/Blogs';
import Notifications from './components/Notifications';
import Users from './components/Users';
import BlogsPerUser from './components/BlogsPerUser';
import NavBar from './components/NavBar';
import { initilizeBlogs } from './redux/reducers/blogReducer';
import './App.css';
// import BlogView from './components/BlogView';
import Blog from './components/Blog';

const App = () => {
  const { user } = useSelector((state) => state.login);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initilizeBlogs());
  }, []);

  return (
    <div>
      <NavBar />
      <Notifications />
      {!user ? (
        <div>
          <h1>Log into Application</h1>
          <LoginForm />
        </div>
      ) : (
        <div>
          <Routes>
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<BlogsPerUser />} />
            <Route path="/blogs/:id" element={<Blog />} />
          </Routes>
        </div>
      )}
    </div>
  );
};

export default App;
