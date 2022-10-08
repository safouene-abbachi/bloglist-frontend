import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from '../components/Blog';

describe('<Blog/>', () => {
  let component;
  const blog = {
    author: 'ameni',
    likes: 10,
    title: 'ameni blog',
    url: 'am.ameni.com',
  };
  const user = {
    name: 'safouene',
    username: 'saf',
  };
  const mochHandlerUpdate = jest.fn();
  const mochHandlerDelete = jest.fn();
  beforeEach(() => {
    component = render(
      <Blog
        blog={blog}
        user={user}
        addLikesToBlog={mochHandlerUpdate}
        deleteBlog={mochHandlerDelete}
      />
    ).container;
  });
  test('renders title and author but not url and likes', () => {
    const element = screen.getByText('ameni-ameni blog');
    expect(element).toBeDefined();
    const div = component.querySelector('.togglableContent');
    expect(div).toHaveStyle('display: none');
  });

  test('url and likes are only displayed when button is clicked', async () => {
    const visibleContent = component.querySelector('.togglableContent');
    const likes = component.querySelector('.likes');
    expect(visibleContent).toHaveStyle('display: none');
    expect(visibleContent).not.toBeVisible();
    expect(likes).toHaveTextContent(blog.likes);
    expect(likes).not.toBeVisible();

    const userAction = userEvent.setup();
    const viewButton = screen.getByText('view');
    await userAction.click(viewButton);

    expect(visibleContent).not.toHaveStyle('display: none');
    expect(visibleContent).toBeVisible();
    expect(likes).toBeVisible();
  });

  test('likes button is clicked twice', async () => {
    const likesButton = screen.getByText('like');
    const user = userEvent.setup();
    await user.dblClick(likesButton);
    expect(mochHandlerUpdate.mock.calls).toHaveLength(2);
  });
});
