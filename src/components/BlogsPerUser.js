import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

const BlogsPerUser = () => {
  const { id } = useParams();
  const user = useSelector((state) =>
    state.users.filter((user) => user.id === id)
  )[0];
  console.log('🚀 ~ user', user);
  return (
    <div>
      <h2>{user?.name}</h2>
      <h3>Added blogs</h3>
      <ul>
        {user?.blogs.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>{' '}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogsPerUser;
