import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { setCloseModal } from '../../../store/modalsSlice';
import { useAppDispatch } from '../../../hooks/hooks';
import { removePost } from '../../../store/postsSlice';
import { removeAlbum } from '../../../store/albumsSlice';

type DeleteValueProps = {
  id: number;
  typeModal: string;
  textModal: string;
};

const DeleteValue = ({ id, typeModal, textModal }: DeleteValueProps) => {
  const dispatch = useAppDispatch();
  const handleClose = () => dispatch(setCloseModal());
  const handleRemove = () => {
    switch (typeModal) {
      case 'deletePost':
        dispatch(removePost(id));
        break;
      case 'deleteAlbum':
        dispatch(removeAlbum(id));
        break;
      default:
        break;
    }
    dispatch(setCloseModal());
  };

  return (
    <Modal show onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Удаление</Modal.Title>
      </Modal.Header>
      <Modal.Body>{`Вы действительно хотите удалить ${textModal}?`}</Modal.Body>
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

export default DeleteValue;
