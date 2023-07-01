import { useAppDispatch } from '../../hooks/hooks';
import {
  AlbumsFiltersSortStateType,
  InitialFiltersStateType,
  PostsFiltersStateType,
  SortOrderType,
  SortType,
  setSortBy,
  unsetSort,
} from '../../store/filtersSlice';
import './sortingPosts.scss';

interface SortingPostProps {
  sortTarget: keyof InitialFiltersStateType,
  selectedSort: AlbumsFiltersSortStateType | PostsFiltersStateType
}

const SortingPosts = ({ sortTarget, selectedSort }: SortingPostProps) => {
  const dispatch = useAppDispatch();
  const { status, queryParams } = selectedSort;
  const { sortBy } = status;
  const { sortOrder } = queryParams;

  const handleSort = (newSortBy: SortType) => {
    let newSortOrder: SortOrderType = 'ascend';

    if (sortBy === newSortBy) {
      newSortOrder = sortOrder === 'ascend' ? 'descend' : 'ascend';
    }
    dispatch(setSortBy({ target: sortTarget, sortBy: newSortBy, sortOrder: newSortOrder }));
  };

  const handleResetSort = () => {
    dispatch(unsetSort(sortTarget));
  };

  return (
    <div className="sortingPosts">
      <div className="sortingPosts__btnContainer">
        <span className="sortingPosts__desc">Сортировать по</span>
        <button onClick={() => handleSort('id')} className="sortingPosts__btn" type="button">
          Id
          {' '}
          {sortBy === 'id' && (sortOrder === 'ascend' ? '▲' : '▼')}
        </button>
        <button onClick={() => handleSort('title')} className="sortingPosts__btn" type="button">
          Названию
          {' '}
          {sortBy === 'title' && (sortOrder === 'ascend' ? '▲' : '▼')}
        </button>
        <button onClick={() => handleSort('userId')} className="sortingPosts__btn" type="button">
          Автору
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
    </div>
  );
};

export default SortingPosts;
