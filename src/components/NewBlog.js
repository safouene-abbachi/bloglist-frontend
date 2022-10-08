import React, { useState } from 'react';
import { createNewBlog } from '../services/blogs';

const NewBlog = ({ setNotifType, setConfirmationMessage }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const addBlog = async () => {
    try {
      await createNewBlog({ title, author, url });
      setConfirmationMessage(`a new blog ${title} was added by ${author}`);
      setNotifType('success');
    } catch (error) {
      setConfirmationMessage(error);
      setNotifType('error');
    }
  };

  return (
    <div className="formWrapper">
      <h1>Create new</h1>
      <form data-testid="submitForm" onSubmit={addBlog}>
        <div>
          Title
          <input
            data-testid="title"
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Author
          <input
            data-testid="cauthor"
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          Url
          <input
            data-testid="url"
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default NewBlog;
