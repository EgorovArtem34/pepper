import { Container, Spinner } from 'react-bootstrap';
import './loader.scss';

const Loader = () => (
  <Container className="loader__container">
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
    <span className="loader__text">Loading...</span>
  </Container>
);

export default Loader;
