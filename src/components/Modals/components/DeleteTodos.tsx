import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { setCloseModal } from '../../../store/modalsSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { filterFavoritesLocalStorage } from '../../../utils/utils';
import { removeTodo } from '../../../store/todosSlice';
import { clearCheckboxesTodos } from '../../../store/checkboxesSlice';
import ModalLoader from './ModalLoader/ModalLoader';

const DeleteTodos = () => {
  const dispatch = useAppDispatch();
  const { activeCheckboxesTodos } = useAppSelector((state) => state.checkboxesSlice);
  const {
    isLoadings: { removeTodoLoading },
  } = useAppSelector((state) => state.todosSlice);
  const handleClose = () => dispatch(setCloseModal());

  if (removeTodoLoading) {
    return <ModalLoader />;
  }

  const handleRemove = async () => {
    try {
      await Promise.all(
        activeCheckboxesTodos.map((checkbox) => dispatch(removeTodo(checkbox))),
      );

      toast.success('Удаление прошло успешно');
      filterFavoritesLocalStorage(activeCheckboxesTodos, 'favoritesTodos');
      dispatch(clearCheckboxesTodos());
      dispatch(setCloseModal());
    } catch (err) {
      toast.error('Ошибка при удалении');
    }
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

export default DeleteTodos;
