import { useEffect } from 'react';
import {
  Routes, Route, useNavigate, useLocation,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainPage from './pages/MainPage/MainPage';
import './styles/index.scss';
import Modals from './components/Modals/Modals';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import AlbumsPage from './pages/AlbumsPage/AlbumsPage';
import PhotosPage from './pages/PhotosPage/PhotosPage';

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const currentPathname = localStorage.getItem('pathname');
    if (currentPathname) {
      navigate(currentPathname);
    }
  }, [navigate]);

  useEffect(() => {
    localStorage.setItem('pathname', location.pathname);
    return () => {
      localStorage.removeItem('pathname');
    };
  }, [location]);

  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/albums" element={<AlbumsPage />} />
        <Route path="/albums/:id" element={<PhotosPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <ToastContainer />
      <Modals />
    </>
  );
};

export default App;
