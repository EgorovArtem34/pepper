import { BiTask, BiTaskX } from 'react-icons/bi';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { setSortBy } from '../../store/todosSlice';
import './sortingTodos.scss';

const SortingTodos = () => {
  const dispatch = useAppDispatch();
  const {
    filtersAndSort: {
      status: { sortBy },
      queryParams: { sortOrder },
    },
  } = useAppSelector((state) => state.todosSlice);

  const handleSort = () => {
    const newSortOrder = sortOrder === 'unCompleted' ? 'completed' : 'unCompleted';
    dispatch(setSortBy(newSortOrder));
  };

  return (
    <div className="sort__interface">
      <span className="sortingValues__desc">Сортировать по</span>
      <button onClick={() => handleSort()} className="sortingValues__btn" type="button">
        Статусу задачи
        {' '}
        {sortBy && (sortOrder === 'completed' ? <BiTask /> : <BiTaskX />)}
      </button>
    </div>
  );
};

export default SortingTodos;
