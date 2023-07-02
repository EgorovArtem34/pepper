import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { AiOutlineSearch } from 'react-icons/ai';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import '../filters.scss';
import { makeFiltersPosts } from '../../../../store/postsSlice';
import { InitialFiltersStateType, setFilterByTitle, unsetFilterBy } from '../../../../store/filtersSlice';
import {
  TodosArrayType,
  makeFiltersAndSortTodos,
  unsetFilterBy as unsetFilterTodosBy,
  setFilterByTitle as setFilterTodosByTitle,
} from '../../../../store/todosSlice';
import { filterAndSortAlbums } from '../../../../store/albumsSlice';

type FilterByTitleType = {
  filterBy: string,
  filterTarget: keyof InitialFiltersStateType | keyof TodosArrayType
};

const FilterByTitle = ({ filterBy, filterTarget }: FilterByTitleType) => {
  const dispatch = useAppDispatch();
  const [inputValue, setInputValue] = useState('');
  const selectedPostsFilters = useAppSelector((state) => state.filtersSlice.posts);
  const selectedAlbumsFilters = useAppSelector((state) => state.filtersSlice.albums);
  const [showClearButton, setShowClearButton] = useState(false);
  const [searchTimeoutId, setSearchTimeoutId] = useState<number | null>(null);
  const timeout = 500;

  const handleSearch = (value: string) => {
    switch (filterTarget) {
      case 'todos':
        if (!value) {
          dispatch(unsetFilterTodosBy('isFilterByTitleActive'));
        } else {
          dispatch(setFilterTodosByTitle(value));
        }
        dispatch(makeFiltersAndSortTodos());
        break;
      case 'posts':
      case 'albums':
        if (!value) {
          dispatch(unsetFilterBy({ target: filterTarget, filter: 'isFilterByTitleActive' }));
        } else {
          dispatch(setFilterByTitle({ target: filterTarget, value }));
        }

        if (filterTarget === 'posts') {
          dispatch(makeFiltersPosts(selectedPostsFilters));
        } else {
          dispatch(filterAndSortAlbums(selectedAlbumsFilters));
        }
        break;
      default: break;
    }
    return null;
  };

  const handleClear = () => {
    setInputValue('');
    if (filterTarget === 'todos') {
      dispatch(unsetFilterTodosBy('isFilterByTitleActive'));
    } else {
      dispatch(unsetFilterBy({ target: filterTarget, filter: 'isFilterByTitleActive' }));
    }
    setShowClearButton(false);
  };

  const handleChange = (value: string): void => {
    setInputValue(value);
    if (searchTimeoutId) {
      clearTimeout(searchTimeoutId);
    }
    const newTimeoutId: number = setTimeout(() => handleSearch(value), timeout);
    setSearchTimeoutId(newTimeoutId);
    setShowClearButton(!!value);
  };

  return (
    <form className="filters__form">
      <input
        type="text"
        placeholder={`Поиск по ${filterBy}`}
        value={inputValue}
        onChange={(e) => handleChange(e.target.value)}
        className="filters__input"
      />
      {showClearButton && (
        <div
          className="filters__clear-button"
          onClick={handleClear}
          onKeyDown={handleClear}
          role="button"
          tabIndex={0}
        >
          <FaTimes />
        </div>
      )}
      <div className="filters__input-img">
        <AiOutlineSearch />
      </div>
    </form>
  );
};

export default FilterByTitle;
