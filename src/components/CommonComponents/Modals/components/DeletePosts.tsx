import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { setCloseModal } from '../../../../store/modalsSlice';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { removePost } from '../../../../store/postsSlice';
import { clearCheckboxesPosts } from '../../../../store/checkboxesSlice';
import { filterFavoritesLocalStorage } from '../../../../utils/utils';
import ModalLoader from './ModalLoader/ModalLoader';

const DeletePosts = () => {
  const dispatch = useAppDispatch();
  const {
    isLoadings: { removePostLoading },
  } = useAppSelector((state) => state.postsSlice);
  const { activeCheckboxesPosts } = useAppSelector((state) => state.checkboxesSlice);
  const handleClose = () => dispatch(setCloseModal());
  const handleRemove = async () => {
    try {
      await Promise.all(
        activeCheckboxesPosts.map((checkbox) => dispatch(removePost(checkbox))),
      );

      toast.success('Удаление прошло успешно');
      filterFavoritesLocalStorage(activeCheckboxesPosts, 'favoritesPosts');
      dispatch(clearCheckboxesPosts());
      dispatch(setCloseModal());
    } catch (err) {
      toast.error('Ошибка при удалении');
    }
  };

  if (removePostLoading) {
    return <ModalLoader />;
  }
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
