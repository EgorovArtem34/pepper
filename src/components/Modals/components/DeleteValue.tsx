import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { setCloseModal } from '../../../store/modalsSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { removePost } from '../../../store/postsSlice';
import { removeAlbum } from '../../../store/albumsSlice';
import ModalLoader from './ModalLoader/ModalLoader';

type DeleteValueProps = {
  id: number;
  typeModal: string;
  textModal: string;
};

const DeleteValue = ({ id, typeModal, textModal }: DeleteValueProps) => {
  const dispatch = useAppDispatch();
  const handleClose = () => dispatch(setCloseModal());
  const {
    isLoadings: { removePostLoading },
  } = useAppSelector((state) => state.postsSlice);
  const {
    isLoadings: { removeAlbumLoading },
  } = useAppSelector((state) => state.albumsSlice);
  const handleRemove = async () => {
    if (typeModal === 'deletePost') {
      try {
        await dispatch(removePost(id));
        toast.success('Пост успешно удален');
      } catch {
        toast.error('Ошибка при удалении поста');
      }
    }

    if (typeModal === 'deleteAlbum') {
      try {
        await dispatch(removeAlbum(id));
        toast.success('Альбом успешно удален');
      } catch (err: any) {
        toast.error('Ошибка при удалении альбома');
      }
    }

    dispatch(setCloseModal());
  };

  if (removeAlbumLoading || removePostLoading) {
    return <ModalLoader />;
  }

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
