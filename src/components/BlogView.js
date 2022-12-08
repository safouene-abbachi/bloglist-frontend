import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
const BlogView = () => {
  const { id } = useParams();
  console.log('🚀 ~ id', id);
  const blog = useSelector(
    (state) => state.blogs.filter((a) => a.id === id)[0]
  );
  console.log('🚀 ~ blog', blog);
  return (
    <div>
      <h1>{blog.title}</h1>
      <a href={blog.url}>{blog.url}</a>
      <div>
        <span>{blog.likes} likes</span>
      </div>
    </div>
  );
};

export default BlogView;
