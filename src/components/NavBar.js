import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/reducers/loginReducer';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
const NavBar = () => {
  const { user } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(logoutUser());
  };
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container fluid>
          <Navbar.Brand href="/blogs">Blog App</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link>
              <Link to="/blogs">Blogs </Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/users">Users</Link>
            </Nav.Link>
            <Navbar.Brand sm>{user.name} is logged-in</Navbar.Brand>
          </Nav>

          <Button height="25px" onClick={logout}>
            logout
          </Button>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
