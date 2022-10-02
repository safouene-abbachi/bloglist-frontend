import React, { useState } from 'react';
import { createNewBlog } from '../services/blogs';

const NewBlog = ({
  setNotifType,
  setConfirmationMessage,
  setVisibleBLogForm,
}) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const addBlog = async () => {
    try {
      await createNewBlog({ title, author, url });
      setConfirmationMessage(`a new blog ${title} was added by ${author}`);
      setNotifType('success');
      setVisibleBLogForm(false);
    } catch (error) {
      setConfirmationMessage(error);
      setNotifType('error');
    }
  };
  const cancelEvent = (e) => {
    e.preventDefault();
    setVisibleBLogForm(false);
  };
  return (
    <>
      <h1>Create new</h1>
      <form onSubmit={addBlog}>
        <div>
          Title
          <input
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Author
          <input
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          Url
          <input
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">Create</button>
        <button onClick={cancelEvent}>cancel</button>
      </form>
    </>
  );
};

export default NewBlog;
