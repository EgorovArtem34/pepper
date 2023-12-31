import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { setCloseModal } from '../../../../store/modalsSlice';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { clearCheckboxesPosts } from '../../../../store/checkboxesSlice';
import { setFavoritePost } from '../../../../store/postsSlice';
import { setFavoriteLocalStorage } from '../../../../utils/utils';

const SetLikePosts = () => {
  const dispatch = useAppDispatch();
  const { activeCheckboxesPosts } = useAppSelector((state) => state.checkboxesSlice);
  const handleClose = () => dispatch(setCloseModal());
  const handleLike = () => {
    activeCheckboxesPosts.forEach((id: number) => {
      const favorites: number[] = JSON.parse(localStorage.getItem('favoritesPosts') ?? JSON.stringify([]));
      if (!(favorites.includes(id))) {
        dispatch(setFavoritePost(id));
        setFavoriteLocalStorage(id, true, 'favoritesPosts');
        toast.success('Успешное добавление в избранное');
      }
    });
    dispatch(clearCheckboxesPosts());
    dispatch(setCloseModal());
  };

  return (
    <Modal show onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Добавить посты в избранное</Modal.Title>
      </Modal.Header>
      <Modal.Body>Вы действительно хотите добавить в избранное выделенные посты?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Отменить
        </Button>
        <Button variant="primary" onClick={handleLike}>
          Подтвердить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SetLikePosts;
