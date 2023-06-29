import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { setCloseModal } from '../../../store/modalsSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import AddPostForm from '../../Forms/addPostForm/AddPostForm';

const AddNewPost = () => {
  const dispatch = useAppDispatch();
  const handleClose = () => dispatch(setCloseModal());

  return (
    <Modal show onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Создание поста</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AddPostForm />
      </Modal.Body>
    </Modal>
  );
};

export default AddNewPost;
