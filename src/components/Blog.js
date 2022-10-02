import React, { useState } from 'react';

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5,
};
const titleStyle = { fontSize: '30px', fontWeight: 'bold' };

const Blog = ({ blog, addLikesToBlog, user, deleteBlog }) => {
  console.log('🚀 ~ blog', blog);
  const [showInfo, setShowInfo] = useState(false);
  const showDeleteButton = user.name === blog?.user?.name;
  return (
    <div style={blogStyle}>
      <span style={titleStyle}>{blog.title}</span>
      <button onClick={() => setShowInfo(!showInfo)}>
        {showInfo ? 'hide' : 'view'}
      </button>
      {showInfo && (
        <>
          <p>{blog.url}</p>
          <span>{blog.likes}</span>
          <button onClick={() => addLikesToBlog(blog)}>like</button>
          <p>{blog.author}</p>
          {showDeleteButton && (
            <button
              style={{ backgroundColor: 'red', color: '#FFF' }}
              onClick={() => deleteBlog(blog)}
            >
              remove
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default Blog;
