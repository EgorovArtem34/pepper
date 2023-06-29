import { useEffect } from 'react';
import {
  Routes, Route, useLocation, useNavigate,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainPage from './pages/MainPage/MainPage';
import './styles/index.scss';
import Modals from './components/Modals/Modals';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('pathname', location.pathname);
  }, [location.pathname]);

  const currentPathname = localStorage.getItem('pathname');

  useEffect(() => {
    if (currentPathname) {
      navigate(currentPathname);
    }
  }, [currentPathname, navigate]);

  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <ToastContainer />
      <Modals />
    </>
  );
};

export default App;
