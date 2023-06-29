import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import {
  SortOrderType,
  SortType,
  setSortBy,
  unsetSort,
} from '../../store/filtersSlice';
import './sortingPosts.scss';

const SortingPosts = () => {
  const dispatch = useAppDispatch();
  const { status, queryParams } = useAppSelector((state) => state.filtersSlice.posts);
  const { sortBy } = status;
  const { sortOrder } = queryParams;

  const handleSort = (newSortBy: SortType) => {
    let newSortOrder: SortOrderType = 'ascend';

    if (sortBy === newSortBy) {
      newSortOrder = sortOrder === 'ascend' ? 'descend' : 'ascend';
    }
    dispatch(setSortBy({ sortBy: newSortBy, sortOrder: newSortOrder }));
  };

  const handleResetSort = () => {
    dispatch(unsetSort());
  };

  return (
    <div className="sortingPosts">
      <button onClick={() => handleSort('id')} className="sortingPosts__btn" type="button">
        Sort by ID
        {' '}
        {sortBy === 'id' && (sortOrder === 'ascend' ? '▲' : '▼')}
      </button>
      <button onClick={() => handleSort('title')} className="sortingPosts__btn" type="button">
        Sort by Title
        {' '}
        {sortBy === 'title' && (sortOrder === 'ascend' ? '▲' : '▼')}
      </button>
      <button onClick={() => handleSort('userId')} className="sortingPosts__btn" type="button">
        Sort by User ID
        {' '}
        {sortBy === 'userId' && (sortOrder === 'ascend' ? '▲' : '▼')}
      </button>
      {sortBy && (
        <button onClick={handleResetSort} className="sortingPosts__btn" type="button">
          Сбросить сортировку
          {' '}
          <span className="reset-icon">&#8634;</span>
        </button>
      )}
    </div>
  );
};

export default SortingPosts;
