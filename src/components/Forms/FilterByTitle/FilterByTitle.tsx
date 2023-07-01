import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { AiOutlineSearch } from 'react-icons/ai';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import '../filters.scss';
import { makeFiltersPosts } from '../../../store/postsSlice';
import { InitialFiltersStateType, setFilterByTitle, unsetFilterBy } from '../../../store/filtersSlice';

type FilterByTitleType = { filterBy: string, filterTarget: keyof InitialFiltersStateType };

const FilterByTitle = ({ filterBy, filterTarget }: FilterByTitleType) => {
  const dispatch = useAppDispatch();
  const [inputValue, setInputValue] = useState('');
  const selectedPostFilters = useAppSelector((state) => state.filtersSlice.posts);
  const [showClearButton, setShowClearButton] = useState(false);
  const [searchTimeoutId, setSearchTimeoutId] = useState<number | null>(null);
  const timeout = 500;

  const handleSearch = (value: string) => {
    if (!value) {
      dispatch(unsetFilterBy({ target: filterTarget, filter: 'isFilterByTitleActive' }));
      return;
    }
    dispatch(setFilterByTitle({ target: filterTarget, value }));
    dispatch(makeFiltersPosts(selectedPostFilters));
  };

  const handleClear = () => {
    setInputValue('');
    dispatch(unsetFilterBy({ target: filterTarget, filter: 'isFilterByTitleActive' }));
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
