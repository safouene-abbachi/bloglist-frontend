import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogForm from '../components/NewBlog';

test('check form event handler and right details', async () => {
  const handleSubmit = jest.fn();
  const visibilityButton = screen.getByText('new blog');
  console.log('🚀 ~ visibilityButton', visibilityButton);
  await user.click(visibilityButton);
  const sendButton = screen.getByText('Create');

  const user = userEvent.setup();
  const titleInput = screen.getByTestId('#title');
  const authorInput = screen.getByTestId('#author');
  const urlInput = screen.getByTestId('#url');

  await user.type(titleInput, 'hello');
  await user.type(authorInput, 'safouene');
  await user.type(urlInput, 'google.com');

  await user.click(sendButton);
  expect(handleSubmit.mock.calls).toHaveLength(1);
  expect(handleSubmit.mock.calls[0][0].title).toBe('hello');
  expect(handleSubmit.mock.calls[0][0].author).toBe('safouene');
  expect(handleSubmit.mock.calls[0][0].url).toBe('google.com');
});
