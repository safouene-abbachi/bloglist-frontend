import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Button, ListGroup, Card, InputGroup, Form } from 'react-bootstrap';
import {
  addCommentToBlog,
  deleteBlogById,
  updateBlog,
} from '../redux/reducers/blogReducer';

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  marginBottom: 5,
};
const boxStyle = {
  display: 'flex',
  justifyContent: 'space-between',
};

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
    setValue('');
  };
  return (
    <Card style={blogStyle}>
      <Card.Body>
        <div style={boxStyle}>
          <Card.Title>
            {' '}
            {oneBlog?.author}-{oneBlog?.title}
          </Card.Title>
          <Button
            variant="outline-primary"
            onClick={() => setShowInfo(!showInfo)}
          >
            {' '}
            {showInfo ? 'hide' : 'view'}
          </Button>
        </div>
        <div style={showDetails} className="togglableContent">
          <Card.Link href={oneBlog?.url}>{oneBlog?.url}</Card.Link>

          <p>Added by {oneBlog?.author}</p>
          <h2>Comments</h2>

          <InputGroup className="mb-3">
            <Form.Control
              placeholder="type here..."
              aria-label="type here..."
              aria-describedby="basic-addon2"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <Button
              variant="outline-success"
              id="button-addon2"
              onClick={() => addComment(value, oneBlog.id)}
            >
              Add comment
            </Button>
          </InputGroup>

          <ListGroup variant="flush">
            {oneBlog?.comments.map((comment) => (
              <ListGroup.Item key={comment.id}>{comment.title}</ListGroup.Item>
            ))}
          </ListGroup>

          {showDeleteButton && (
            <Button variant="danger" onClick={() => deleteBlog(oneBlog)}>
              remove
            </Button>
          )}
          <Button variant="warning" onClick={() => addLikesToBlog(oneBlog)}>
            {oneBlog?.likes} likes
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Blog;
