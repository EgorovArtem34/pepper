import Modal from "react-bootstrap/Modal";
import { setCloseModal } from "../../../../store/modalsSlice";
import { useAppDispatch, useAppSelector } from "../../../../hooks/hooks";
import AddTodoForm from "../../Forms/AddTodoForm/AddTodoForm";
import ModalLoader from "./ModalLoader/ModalLoader";

const AddNewTodo = () => {
  const dispatch = useAppDispatch();
  const handleClose = () => dispatch(setCloseModal());
  const {
    isLoadings: { addTodoLoading },
  } = useAppSelector((state) => state.todosSlice);

  if (addTodoLoading) {
    return <ModalLoader />;
  }

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
