import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { setCloseModal } from '../../../store/modalsSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { clearCheckboxesAlbums } from '../../../store/checkboxesSlice';
import { setFavoriteLocalStorage } from '../../../utils/utils';
import { setFavoriteAlbum } from '../../../store/albumsSlice';

const SetLikeAlbums = () => {
  const dispatch = useAppDispatch();
  const { activeCheckboxesAlbums } = useAppSelector((state) => state.checkboxesSlice);
  const handleClose = () => dispatch(setCloseModal());
  const handleLike = async () => {
    activeCheckboxesAlbums.forEach((id: number) => {
      const favorites: number[] = JSON.parse(localStorage.getItem('favoritesAlbums') ?? JSON.stringify([]));
      if (!(favorites.includes(id))) {
        dispatch(setFavoriteAlbum(id));
        setFavoriteLocalStorage(id, true, 'favoritesAlbums');
        toast.success('Успешное добавление в избранное');
      }
    });
    dispatch(clearCheckboxesAlbums());
    dispatch(setCloseModal());
  };

  return (
    <Modal show onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Добавить альбомы в избранное</Modal.Title>
      </Modal.Header>
      <Modal.Body>Вы действительно хотите добавить в избранное выделенные альбомы?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Отменить
        </Button>
        <Button variant="primary" onClick={handleLike}>
          Подтвердить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SetLikeAlbums;
