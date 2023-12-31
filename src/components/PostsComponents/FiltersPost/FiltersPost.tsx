import { useState, ChangeEvent } from 'react';
import FilterByTitle from '../../CommonComponents/Forms/FilterByTitle/FilterByTitle';
import './filtersPost.scss';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import SelectMultipleForm from '../../CommonComponents/Forms/SelectMultipleForm/SelectMultipleForm';
import Checkbox from '../../CommonComponents/Checkbox/Checkbox';
import { setFilterByFavorite, setFilterByUsers, unsetFilterBy } from '../../../store/filtersSlice';

interface Option {
  readonly label: string;
  readonly value: string;
}

const FiltersPost = () => {
  const dispatch = useAppDispatch();
  const [isChecked, setIsChecked] = useState(false);
  const { users } = useAppSelector((state) => state.usersSlice);
  const optionsForMultipleSelect = users.map((user) => ({
    value: user.id,
    label: user.username,
  }));

  const handleSelectChange = (selectedUsers: Option[]) => {
    if (selectedUsers.length === 0) {
      dispatch(unsetFilterBy({ target: 'posts', filter: 'isFilterByByUsersActive' }));
      return null;
    }
    const modifySelectedUsers: number[] = selectedUsers.flatMap((user) => +user.value);
    dispatch(setFilterByUsers({ target: 'posts', value: modifySelectedUsers }));
    return null;
  };
  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.checked;
    if (newValue) {
      dispatch(setFilterByFavorite('posts'));
    } else {
      dispatch(unsetFilterBy({ target: 'posts', filter: 'isFilterByFavoriteActive' }));
    }
    setIsChecked((prev) => !prev);
  };

  return (
    <div className="filters">
      <Checkbox
        name="favorites-posts"
        id="favorites-posts"
        checked={isChecked}
        onChange={handleCheckboxChange}
        isLabel
      >
        Показать избранные посты
      </Checkbox>
      <FilterByTitle filterBy="заголовку" filterTarget="posts" />
      <SelectMultipleForm
        defaultValue=""
        options={optionsForMultipleSelect}
        placeholder="Фильтрация по именам пользователей"
        onChange={(selectedUsers: Option[]) => handleSelectChange(selectedUsers)}
      />
    </div>
  );
};

export default FiltersPost;
