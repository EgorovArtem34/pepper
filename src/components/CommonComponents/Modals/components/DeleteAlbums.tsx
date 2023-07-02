import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { setCloseModal } from '../../../../store/modalsSlice';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { clearCheckboxesAlbums } from '../../../../store/checkboxesSlice';
import { filterFavoritesLocalStorage } from '../../../../utils/utils';
import { removeAlbum } from '../../../../store/albumsSlice';
import Loader from '../../Loader/Loader';

const DeleteAlbums = () => {
  const dispatch = useAppDispatch();
  const { activeCheckboxesAlbums } = useAppSelector((state) => state.checkboxesSlice);
  const {
    isLoadings: { removeAlbumLoading },
  } = useAppSelector((state) => state.albumsSlice);
  const handleClose = () => dispatch(setCloseModal());

  const handleRemove = async () => {
    try {
      await Promise.all(
        activeCheckboxesAlbums.map((checkbox) => dispatch(removeAlbum(checkbox))),
      );

      toast.success('Удаление прошло успешно');
      filterFavoritesLocalStorage(activeCheckboxesAlbums, 'favoritesAlbums');
      dispatch(clearCheckboxesAlbums());
      dispatch(setCloseModal());
    } catch (err) {
      toast.error('Ошибка при удалении');
    }
  };

  if (removeAlbumLoading) {
    return <Loader />;
  }
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
