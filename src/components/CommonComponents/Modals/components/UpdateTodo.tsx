import Modal from "react-bootstrap/Modal";
import { setCloseModal } from "../../../../store/modalsSlice";
import { useAppDispatch, useAppSelector } from "../../../../hooks/hooks";
import UpdateTodoForm from "../../Forms/UpdateTodoForm/UpdateTodoForm";
import CompletedTodoForm from "../../Forms/UpdateTodoForm/CompletedTodoForm";
import ModalLoader from "./ModalLoader/ModalLoader";

const UpdateTodo = ({ typeChange }: { typeChange: string }) => {
  const dispatch = useAppDispatch();
  const handleClose = () => dispatch(setCloseModal());

  const {
    isLoadings: { changeTodoLoading },
  } = useAppSelector((state) => state.todosSlice);

  if (changeTodoLoading) {
    return <ModalLoader />;
  }

  return (
    <Modal show onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Обновление задачи</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {typeChange === "complete" ? <CompletedTodoForm /> : <UpdateTodoForm />}
      </Modal.Body>
    </Modal>
  );
};

export default UpdateTodo;
