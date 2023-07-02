import { PhotoType, setCurrentPhoto } from '../../../store/photosSlice';
import { useAppDispatch } from '../../../hooks/hooks';
import { setShowModal } from '../../../store/modalsSlice';
import Button from '../../CommonComponents/Button/Button';
import './photo.scss';

const Photo = ({ photo }: { photo: PhotoType }) => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(setCurrentPhoto(photo));
    dispatch(setShowModal({ typeModal: 'showPhoto' }));
  };

  return (
    <div className="photo-card">
      <Button className="photo-card__button" type="button" onClick={handleClick}>
        <img
          className="photo-card__image"
          src={photo.thumbnailUrl}
          alt={photo.title}
        />
      </Button>
      <div className="photo-card__body">
        <p className="photo-card__text">{photo.title}</p>
      </div>
    </div>
  );
};

export default Photo;
