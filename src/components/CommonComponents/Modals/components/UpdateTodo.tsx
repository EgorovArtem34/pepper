import Modal from 'react-bootstrap/Modal';
import { setCloseModal } from '../../../../store/modalsSlice';
import { useAppDispatch } from '../../../../hooks/hooks';
import UpdateTodoForm from '../../Forms/UpdateTodoForm/UpdateTodoForm';
import CompletedTodoForm from '../../Forms/UpdateTodoForm/CompletedTodoForm';

const UpdateTodo = ({ typeChange }: { typeChange: string }) => {
  const dispatch = useAppDispatch();
  const handleClose = () => dispatch(setCloseModal());

  return (
    <Modal show onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Обновление задачи</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {typeChange === 'complete' ? <CompletedTodoForm /> : <UpdateTodoForm />}
      </Modal.Body>
    </Modal>
  );
};

export default UpdateTodo;
