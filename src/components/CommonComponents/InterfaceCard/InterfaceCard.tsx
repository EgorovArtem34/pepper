import { ChangeEvent } from 'react';
import { FaRegComment, FaCommentSlash } from 'react-icons/fa';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from 'react-icons/md';
import { PostType } from '../../../types';
import Checkbox from '../Checkbox/Checkbox';
import { AlbumType } from '../../../store/albumsSlice';
import './interfaceCard.scss';

type InterfaceCardType = {
  data: PostType | AlbumType;
  activeCheckboxes: number[];
  handleCheckboxChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleRemove: () => void;
  handleFavorite: () => void;
  setIsChangeValue: React.Dispatch<React.SetStateAction<boolean>>;
  isChangeValue: boolean;
  handleClickComment?: () => void;
  isOpenCollapse?: boolean;
};

const InterfaceCard = ({
  data,
  activeCheckboxes,
  handleCheckboxChange,
  handleRemove,
  handleClickComment,
  isOpenCollapse,
  handleFavorite,
  setIsChangeValue,
  isChangeValue,
}: InterfaceCardType) => (
  <div className="card__interface">
    <Checkbox
      name="checkbox-interface"
      id="checkbox-interface"
      checked={activeCheckboxes.includes(data.id)}
      onChange={handleCheckboxChange}
      isLabel={false}
    />
    <button onClick={() => handleRemove()} className="card__button" type="button">
      <AiOutlineDelete className="card__icon" />
    </button>
    {!('isNew' in data) && handleClickComment && (
      <button
        onClick={() => handleClickComment && handleClickComment()}
        aria-controls="comments"
        aria-expanded={isOpenCollapse}
        className="card__button"
        disabled={isChangeValue}
        type="button"
      >
        {isOpenCollapse ? (
          <FaCommentSlash className="card__icon" />
        ) : (
          <FaRegComment className="card__icon" />
        )}
      </button>
    )}
    <button onClick={() => setIsChangeValue(!isChangeValue)} className="card__button" type="button">
      <AiOutlineEdit className="card__icon" />
    </button>
    <button onClick={() => handleFavorite()} className="card__button" type="button">
      {data.isFavorite ? (
        <MdOutlineFavorite className="card__icon" />
      ) : (
        <MdOutlineFavoriteBorder className="card__icon" />
      )}
    </button>
  </div>

);

InterfaceCard.defaultProps = {
  handleClickComment: undefined,
  isOpenCollapse: false,
};

export default InterfaceCard;
