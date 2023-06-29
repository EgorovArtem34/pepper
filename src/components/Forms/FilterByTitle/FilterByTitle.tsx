import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { AiOutlineSearch } from 'react-icons/ai';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import '../filters.scss';
import { makeFiltersPosts } from '../../../store/postsSlice';
import { setFilterByTitle, unsetFilterBy } from '../../../store/filtersSlice';

const FilterByTitle = ({ filterBy }: { filterBy: string }) => {
  const dispatch = useAppDispatch();
  const [inputValue, setInputValue] = useState('');
  const selectedPostFilters = useAppSelector((state) => state.filtersSlice.posts);
  const [showClearButton, setShowClearButton] = useState(false);
  const [searchTimeoutId, setSearchTimeoutId] = useState<number | null>(null);
  const timeout = 500;

  const handleSearch = (value: string) => {
    if (!value) {
      dispatch(unsetFilterBy('isFilterByTitleActive'));
      return;
    }
    dispatch(setFilterByTitle(value));
    dispatch(makeFiltersPosts(selectedPostFilters));
  };

  const handleClear = () => {
    setInputValue('');
    dispatch(unsetFilterBy('isFilterByTitleActive'));
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
