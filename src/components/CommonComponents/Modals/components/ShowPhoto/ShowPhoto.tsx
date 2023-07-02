import { AiOutlineClose } from 'react-icons/ai';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/hooks';
import { setCloseModal } from '../../../../../store/modalsSlice';
import Button from '../../../Button/Button';
import { clearCurrentPhoto } from '../../../../../store/photosSlice';
import './showPhoto.scss';

const ShowPhoto = () => {
  const dispatch = useAppDispatch();
  const { currentPhoto } = useAppSelector((state) => state.photosSlice);

  const handleClick = () => {
    dispatch(clearCurrentPhoto());
    dispatch(setCloseModal());
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      event.stopPropagation();
    }
  };

  return (
    <div
      className="modal"
      onClick={handleClick}
      onKeyDown={handleClick}
      role="button"
      tabIndex={0}
    >
      <div
        className="modal__content"
        onClick={(event) => event.stopPropagation()}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
      >
        <div className="modal__header">
          <Button
            type="button"
            onClick={handleClick}
            className="photo-card__button"
          >
            <AiOutlineClose />
          </Button>
        </div>
        <div className="modal__body">
          <div className="modal__logo-container">
            <img
              className="modal__image"
              src={currentPhoto?.url}
              alt={currentPhoto?.url}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowPhoto;
