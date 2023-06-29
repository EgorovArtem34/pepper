import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { setCloseModal } from '../../../store/modalsSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { removePost } from '../../../store/postsSlice';
import { clearCheckboxesState } from '../../../store/checkboxesSlice';
import { filterFavoritesLocalStorage } from '../../../utils/utils';

const DeletePosts = () => {
  const dispatch = useAppDispatch();
  const { activeCheckboxes } = useAppSelector((state) => state.checkboxesSlice);
  const handleClose = () => dispatch(setCloseModal());
  const handleRemove = () => {
    filterFavoritesLocalStorage(activeCheckboxes);
    activeCheckboxes.map((id: number) => {
      dispatch(removePost(id));
      return null;
    });
    dispatch(clearCheckboxesState());
    dispatch(setCloseModal());
  };

  return (
    <Modal show onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Удаление постов</Modal.Title>
      </Modal.Header>
      <Modal.Body>Вы действительно хотите удалить все выделенные посты?</Modal.Body>
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
