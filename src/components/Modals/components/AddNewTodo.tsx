import Modal from 'react-bootstrap/Modal';
import { setCloseModal } from '../../../store/modalsSlice';
import { useAppDispatch } from '../../../hooks/hooks';
import AddTodoForm from '../../Forms/addTodoForm/AddTodoForm';

const AddNewTodo = () => {
  const dispatch = useAppDispatch();
  const handleClose = () => dispatch(setCloseModal());

  return (
    <Modal show onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Создание задачи</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AddTodoForm />
      </Modal.Body>
    </Modal>
  );
};

export default AddNewTodo;
