import {
  Navbar, Container, Nav, NavLink,
} from 'react-bootstrap';
import cn from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import './header.scss';

const Header = () => {
  const location = useLocation();
  const linkClass = (pathname: string) => cn('link', {
    link_active: location.pathname === pathname,
  });

  return (
    <header>
      <Navbar bg="light" className="mb-3">
        <Container>
          <Navbar.Brand as={Link} to="/">Sotnikov</Navbar.Brand>
          <Nav className="d-flex">
            <NavLink as={Link} to="/" className={linkClass('/')}>Posts</NavLink>
            <NavLink as={Link} to="/next" className={linkClass('/some')}>Next</NavLink>
            <NavLink as={Link} to="/next2" className={linkClass('/some2')}>Next2</NavLink>
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
