import { useState, ChangeEvent } from 'react';
import FilterByTitle from '../Forms/FilterByTitle/FilterByTitle';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import SelectMultipleForm from '../Forms/SelectMultipleForm/SelectMultipleForm';
import Checkbox from '../Checkbox/Checkbox';
import { setFilterByFavorite, setFilterByUsers, unsetFilterBy } from '../../store/filtersSlice';
import './filtersSortAlbums.scss';

interface Option {
  readonly label: string;
  readonly value: string;
}

const FiltersSortAlbums = () => {
  const dispatch = useAppDispatch();
  const [isChecked, setIsChecked] = useState(false);
  const { users } = useAppSelector((state) => state.usersSlice);
  const optionsForMultipleSelect = users.map((user) => ({
    value: user.id,
    label: user.username,
  }));

  const handleSelectChange = (selectedUsers: Option[]) => {
    if (selectedUsers.length === 0) {
      dispatch(unsetFilterBy({ target: 'albums', filter: 'isFilterByByUsersActive' }));
      return null;
    }
    const modifySelectedUsers: number[] = selectedUsers.flatMap((user) => +user.value);
    dispatch(setFilterByUsers({ target: 'albums', value: modifySelectedUsers }));
    return null;
  };
  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.checked;
    if (newValue) {
      dispatch(setFilterByFavorite('albums'));
    } else {
      dispatch(unsetFilterBy({ target: 'albums', filter: 'isFilterByFavoriteActive' }));
    }
    setIsChecked((prev) => !prev);
  };

  return (
    <div className="filters">
      <Checkbox
        name="favorites-albums"
        id="favorites-albums"
        checked={isChecked}
        onChange={handleCheckboxChange}
        isLabel
      >
        Показать избранные посты
      </Checkbox>
      <FilterByTitle filterBy="заголовку" filterTarget="albums" />
      <SelectMultipleForm
        defaultValue=""
        options={optionsForMultipleSelect}
        placeholder="Фильтрация по именам пользователей"
        onChange={(selectedUsers: Option[]) => handleSelectChange(selectedUsers)}
      />
    </div>
  );
};

export default FiltersSortAlbums;
