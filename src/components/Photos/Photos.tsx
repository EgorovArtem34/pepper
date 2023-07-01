import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchPhotosByAlbumId } from '../../store/photosSlice';
import Loader from '../Loader/Loader';
import Photo from '../Photo/Photo';
import './photos.scss';

const Photos = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { photos, isLoading, error } = useAppSelector((state) => state.photosSlice);

  useEffect(() => {
    const path = location.pathname;
    const albumId = path.split('/')[2];
    dispatch(fetchPhotosByAlbumId(+albumId));
  }, [location.pathname, dispatch]);

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    toast.error(`Error fetching photos. ${error}`);
  }
  const createPhotos = () => photos.map((photo) => <Photo photo={photo} key={photo.id} />);
  return (
    <Container>
      {photos.length === 0 ? (
        <p className="text_center">По вашему запросу ничего не найдено</p>
      ) : (
        <div className="photo">
          {createPhotos()}
        </div>
      )}
    </Container>
  );
};

export default Photos;
