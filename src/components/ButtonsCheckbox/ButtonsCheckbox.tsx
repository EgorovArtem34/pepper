import Button from '../Button/Button';
import './buttonsCheckbox.scss';

type ButtonsCheckboxType = {
  handleDelete: () => void;
  handleFavorite?: () => void;
};

const ButtonsCheckbox = ({ handleDelete, handleFavorite }: ButtonsCheckboxType) => (
  <div className="buttons_checkbox">
    <Button
      type="button"
      className="form__button button__back"
      onClick={handleDelete}
    >
      Удалить
    </Button>
    {handleFavorite && (
    <Button
      type="submit"
      className="form__button button__submit"
      onClick={handleFavorite}
    >
      В избранное
    </Button>
    )}
  </div>
);

ButtonsCheckbox.defaultProps = {
  handleFavorite: undefined,
};

export default ButtonsCheckbox;
