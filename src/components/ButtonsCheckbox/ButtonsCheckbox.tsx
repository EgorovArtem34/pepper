import Button from '../Button/Button';
import './buttonsCheckbox.scss';

type ButtonsCheckboxType = {
  handleDelete: () => void;
  handleFavorite: () => void;
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
    <Button
      type="submit"
      className="form__button button__submit"
      onClick={handleFavorite}
    >
      В избранное
    </Button>
  </div>
);

export default ButtonsCheckbox;
