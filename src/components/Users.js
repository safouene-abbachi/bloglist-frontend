import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllUsers } from '../redux/reducers/userReducer';
const Users = () => {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  console.log('🚀 ~ users', users);
  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  return (
    <div>
      <h2>Users</h2>

      <table>
        <tr>
          <th>Name</th>
          <th>Blogs created</th>
        </tr>
        {users.map((user) => (
          <tr key={user.id}>
            <td>
              <Link to={`/users/${user.id}`}>{user.name}</Link>{' '}
            </td>
            <td>{user.blogs.length}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default Users;
