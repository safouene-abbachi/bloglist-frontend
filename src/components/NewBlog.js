import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { initilizeBlogs, newBlog } from '../redux/reducers/blogReducer';
import { setNotifications } from '../redux/reducers/notificationReducer';

const NewBlog = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const addBlog = async (e, title, author, url) => {
    e.preventDefault();
    try {
      dispatch(newBlog(title, author, url));
      dispatch(initilizeBlogs());
      dispatch(
        setNotifications(
          'success',
          `a new blog ${title} was added by ${author}`,
          5
        )
      );
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
  return (
    <div className="formWrapper">
      <h1>Create new</h1>
      <form className="form" onSubmit={(e) => addBlog(e, title, author, url)}>
        <div>
          <input
            data-testid="Title"
            type="text"
            value={title}
            name="title"
            id="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
          <label htmlFor="Title">Title</label>
        </div>
        <div>
          <label htmlFor="Author">Author</label>
          <input
            data-testid="cauthor"
            type="text"
            value={author}
            name="author"
            id="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <label htmlFor="Url">Url</label>
          <input
            data-testid="url"
            type="text"
            value={url}
            name="url"
            id="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id="create_blog_button" data-testid="send" type="submit">
          Create
        </button>
      </form>
    </div>
  );
};

export default NewBlog;
