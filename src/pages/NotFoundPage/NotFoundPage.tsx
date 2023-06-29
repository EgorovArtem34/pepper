import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './notFoundPage.scss';

const NotFoundPage = () => (
  <Container className="page404__container">
    <span className="page404__text">404</span>
    <h1 className="">Page not found</h1>
    <Link to="/" className="page404__link">
      Go to homepage
    </Link>
  </Container>
);
export default NotFoundPage;
