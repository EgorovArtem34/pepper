import { useEffect, useState, ChangeEvent } from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { setShowModal } from '../../store/modalsSlice';
import { AlbumType, setFavoriteAlbum } from '../../store/albumsSlice';
import { setFavoriteLocalStorage } from '../../utils/utils';
import { addCheckboxAlbums, removeCheckboxAlbums } from '../../store/checkboxesSlice';
import InterfaceCard from '../InterfaceCard/InterfaceCard';
import { UserType } from '../../types';
import ChangeAlbum from '../ChangeAlbum/ChangeAlbum';
import './album.scss';

const Album = ({ album }: { album: AlbumType }) => {
  const dispatch = useAppDispatch();

  const { activeCheckboxesAlbums } = useAppSelector((state) => state.checkboxesSlice);
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [isChangeAlbum, setIsChangeAlbum] = useState(false);
  const { users } = useAppSelector((state) => state.usersSlice);

  useEffect(() => {
    setCurrentUser(users.find((user) => user.id === album.userId) as UserType);
  }, [album, currentUser, users]);

  const handleFavorite = () => {
    dispatch(setFavoriteAlbum(album.id));
    setFavoriteLocalStorage(album.id, !album.isFavorite, 'favoritesAlbums');
  };

  const handleRemove = () => {
    dispatch(setShowModal({ typeModal: 'deleteAlbum', id: album.id }));
  };

  const cardClass = () => cn('card', 'p-2', 'mb-4', {
    card_favorite: album.isFavorite,
  });

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.checked;
    if (newValue) {
      dispatch(addCheckboxAlbums(album.id));
    } else {
      dispatch(removeCheckboxAlbums(album.id));
    }
    return null;
  };

  return (
    <div className={cardClass()} key={album.id}>
      <div className="row">
        <div className="px-3">
          <div className="card-block px-6">
            <InterfaceCard
              data={album}
              activeCheckboxes={activeCheckboxesAlbums}
              handleCheckboxChange={handleCheckboxChange}
              handleRemove={handleRemove}
              handleFavorite={handleFavorite}
              setIsChangeValue={setIsChangeAlbum}
              isChangeValue={isChangeAlbum}
            />
            {isChangeAlbum ? (
              <ChangeAlbum
                currentUser={currentUser as UserType}
                album={album}
                setIsChangeAlbum={setIsChangeAlbum}
              />
            ) : (
              <>
                <Link to={`${currentUser?.id}`} className="card__link">{album.title}</Link>
                <p className="card-text">{currentUser?.username}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Album;
