import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { setCloseModal } from '../../../store/modalsSlice';
import { useAppDispatch } from '../../../hooks/hooks';
import { removePost } from '../../../store/postsSlice';

const DeletePost = ({ id }: { id: number }) => {
  const dispatch = useAppDispatch();
  const handleClose = () => dispatch(setCloseModal());
  const handleRemove = () => {
    dispatch(removePost(id));
    dispatch(setCloseModal());
  };

  return (
    <Modal show onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Удаление поста</Modal.Title>
      </Modal.Header>
      <Modal.Body>Вы действительно хотите удалить пост?</Modal.Body>
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

export default DeletePost;
