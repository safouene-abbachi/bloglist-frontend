import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import BlogForm from '../components/NewBlog';

test('check form event handler and right details', async () => {
  const handleSubmit = jest.fn();

  const component = render(<BlogForm addBlog={handleSubmit} />);

  const form = component.container.querySelector('form');

  const titleInput = component.getByLabelText('Title');
  const authorInput = component.getByLabelText('Author');
  const urlInput = component.getByLabelText('Url');

  fireEvent.change(titleInput, { target: { value: 'hello' } });
  fireEvent.change(authorInput, { target: { value: 'safouene' } });
  fireEvent.change(urlInput, { target: { value: 'google.com' } });

  fireEvent.submit(form);

  expect(handleSubmit.mock.calls).toHaveLength(1);
  console.log(handleSubmit.mock.calls);
  expect(handleSubmit.mock.calls[0][0]).toBe('hello');
  expect(handleSubmit.mock.calls[0][1]).toBe('safouene');
  expect(handleSubmit.mock.calls[0][2]).toBe('google.com');
});
