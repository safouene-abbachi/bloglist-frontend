import React, { useState } from 'react';
import PropTypes from 'prop-types';
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
  const showDeleteButton = user?.name === blog?.user?.name;
  const showDetails = { display: showInfo ? '' : 'none' };
  const hideDetails = {
    display: showInfo ? 'none' : '',
    backgroundColor: 'red',
    color: '#FFF',
  };
  return (
    <div style={blogStyle} className="blog">
      <span style={titleStyle}>
        {blog.author}-{blog.title}
      </span>
      <button onClick={() => setShowInfo(!showInfo)}>
        {showInfo ? 'hide' : 'view'}
      </button>

      <div style={showDetails} className="togglableContent">
        <p>{blog.url}</p>
        <span className="likes">{blog.likes}</span>
        <button onClick={() => addLikesToBlog(blog)}>like</button>
        <p>{blog.author}</p>
        {showDeleteButton && (
          <button style={hideDetails} onClick={() => deleteBlog(blog)}>
            remove
          </button>
        )}
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  addLikesToBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  deleteBlog: PropTypes.func.isRequired,
};
export default Blog;
