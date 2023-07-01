import { Navbar, Container, Nav } from 'react-bootstrap';
import cn from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import './header.scss';

const Header = () => {
  const location = useLocation();
  const linkClass = (pathname: string) => cn('link', {
    link_active: pathname === '/' ? location.pathname === pathname : location.pathname.startsWith(pathname),
  });

  return (
    <header>
      <Navbar bg="light" className="mb-3">
        <Container>
          <Navbar.Brand as={Link} to="/">Sotnikov</Navbar.Brand>
          <Nav className="d-flex">
            <Link to="/" className={linkClass('/')}>Posts</Link>
            <Link to="/albums" className={linkClass('/albums')}>Photo</Link>
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
