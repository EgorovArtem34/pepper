import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { setCloseModal } from '../../../store/modalsSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { removePosts } from '../../../store/postsSlice';
import { clearCheckboxesPosts } from '../../../store/checkboxesSlice';
import { filterFavoritesLocalStorage } from '../../../utils/utils';

const DeletePosts = () => {
  const dispatch = useAppDispatch();
  const { activeCheckboxesPosts } = useAppSelector((state) => state.checkboxesSlice);
  const handleClose = () => dispatch(setCloseModal());
  const handleRemove = () => {
    filterFavoritesLocalStorage(activeCheckboxesPosts, 'favoritesPosts');
    dispatch(removePosts(activeCheckboxesPosts));
    dispatch(clearCheckboxesPosts());
    dispatch(setCloseModal());
  };

  return (
    <Modal show onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Удаление постов</Modal.Title>
      </Modal.Header>
      <Modal.Body>Вы действительно хотите удалить выделенные посты?</Modal.Body>
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

export default DeletePosts;
