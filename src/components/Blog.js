import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  addCommentToBlog,
  deleteBlogById,
  updateBlog,
} from '../redux/reducers/blogReducer';
const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5,
};
const boxStyle = {
  display: 'flex',
  justifyContent: 'space-between',
};
const titleStyle = { fontSize: '30px', fontWeight: 'bold' };

const Blog = ({ blog }) => {
  const [showInfo, setShowInfo] = useState(false);
  const [value, setValue] = useState('');
  const { id } = useParams();
  const oneBlog = id
    ? useSelector((state) => state.blogs.filter((a) => a.id === id)[0])
    : blog;
  const user = JSON.parse(localStorage.getItem('user')).name;
  const showDeleteButton = user === oneBlog?.user?.name;
  const showDetails = { display: showInfo || id ? '' : 'none' };

  const dispatch = useDispatch();
  const addLikesToBlog = async (blogData) => {
    dispatch(updateBlog(blogData));
  };
  const deleteBlog = async (blogData) => {
    if (window.confirm(`Remove blog ${blogData.title} by ${blogData.author}`)) {
      dispatch(deleteBlogById(blogData));
    }
  };
  console.log('🚀 ~ oneBlog', oneBlog);
  const addComment = (title, id) => {
    dispatch(addCommentToBlog(title, id));
  };
  return (
    <div style={blogStyle} className="blog">
      <div style={boxStyle}>
        <span style={titleStyle}>
          {oneBlog?.author}-{oneBlog?.title}
        </span>
        <button onClick={() => setShowInfo(!showInfo)}>
          {showInfo ? 'hide' : 'view'}
        </button>
      </div>
      <div style={showDetails} className="togglableContent">
        <p>{oneBlog?.url}</p>
        <span className="likes">{oneBlog?.likes}</span>
        <button onClick={() => addLikesToBlog(oneBlog)}>like</button>
        <p>Added by {oneBlog?.author}</p>
        <h2>Comments</h2>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="type here..."
        />
        <button onClick={() => addComment(value, oneBlog.id)}>
          Add comment
        </button>
        <ul>
          {oneBlog?.comments.map((comment) => (
            <li key={comment.id}>{comment.title}</li>
          ))}
        </ul>
        {showDeleteButton && (
          <button onClick={() => deleteBlog(oneBlog)}>remove</button>
        )}
      </div>
    </div>
  );
};

export default Blog;
