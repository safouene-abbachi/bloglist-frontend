import React from 'react';
import { useSelector } from 'react-redux';
import Blog from './Blog';
import NewBlog from './NewBlog';
import Togglable from './Togglable';

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs);
  const { user } = useSelector((state) => state.login);

  return (
    <div>
      <Togglable>
        <NewBlog token={user.token} />
      </Togglable>

      {blogs?.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default Blogs;
