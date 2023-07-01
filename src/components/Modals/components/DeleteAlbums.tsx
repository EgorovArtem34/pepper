import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { setCloseModal } from '../../../store/modalsSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { clearCheckboxesAlbums } from '../../../store/checkboxesSlice';
import { filterFavoritesLocalStorage } from '../../../utils/utils';
import { removeAlbums } from '../../../store/albumsSlice';

const DeleteAlbums = () => {
  const dispatch = useAppDispatch();
  const { activeCheckboxesAlbums } = useAppSelector((state) => state.checkboxesSlice);
  const handleClose = () => dispatch(setCloseModal());
  const handleRemove = () => {
    filterFavoritesLocalStorage(activeCheckboxesAlbums, 'favoritesAlbums');
    dispatch(removeAlbums(activeCheckboxesAlbums));
    dispatch(clearCheckboxesAlbums());
    dispatch(setCloseModal());
  };

  return (
    <Modal show onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Удаление альбомов</Modal.Title>
      </Modal.Header>
      <Modal.Body>Вы действительно хотите удалить выделенные альбомы?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Отменить
        </Button>
        <Button variant="danger" onClick={handleRemove}>
          Подтвердить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteAlbums;
