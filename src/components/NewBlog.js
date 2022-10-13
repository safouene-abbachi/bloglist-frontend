import React, { useState } from 'react';

const NewBlog = ({ addBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  return (
    <div className="formWrapper">
      <h1>Create new</h1>
      <form className="form" onSubmit={() => addBlog(title, author, url)}>
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
