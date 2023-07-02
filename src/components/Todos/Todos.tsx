import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../Loader/Loader';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { setShowModal } from '../../store/modalsSlice';
import { AlbumType, fetchAlbums, filterAndSortAlbums } from '../../store/albumsSlice';
import { createPageNumbers } from '../../utils/utils';
import SelectPageCount from '../SelectPostPage/SelectPageCount';
import Pagination from '../Pagination/Pagination';
import Album from '../Album/Album';
import { fetchUsers } from '../../store/usersSlice';
import ButtonsCheckbox from '../ButtonsCheckbox/ButtonsCheckbox';
import FiltersSortAlbums from '../FiltersSortAlbums/FiltersSortAlbums';
import SortingValues from '../SortingValues/SortingValues';
import './todos.scss';
import {
  TodoType, fetchTodos, makeFiltersAndSortTodos, setCurrentTodo,
} from '../../store/todosSlice';
import Todo from '../Todo/Todo';
import FilterByTitle from '../Forms/FilterByTitle/FilterByTitle';
import Button from '../Button/Button';
import SortingTodos from '../SortingTodos/SortingTodos';

const Todos = () => {
  const dispatch = useAppDispatch();
  const { activeCheckboxesTodos } = useAppSelector((state) => state.checkboxesSlice);
  const {
    isLoading: isLoadingUsers,
    error: errorUsers,
    users,
  } = useAppSelector((state) => state.usersSlice);
  const {
    todos,
    filteredTodos,
    errors: {
      fetchTodosErr,
      changeTodoErr,
    },
    isLoadings: {
      fetchTodosLoading,
      changeTodoLoading,
    },
    todosPerPage,
    currentTodo,
    filtersAndSort: {
      status,
      queryParams,
    },
  } = useAppSelector((state) => state.todosSlice);

  const [currentPage, setCurrentPage] = useState(1);
  const [currentTodos, setCurrentTodos] = useState<TodoType[]>([]);

  useEffect(() => {
    dispatch(fetchTodos());
    if (users.length === 0) {
      dispatch(fetchUsers());
    }
  }, [dispatch, users.length]);

  useEffect(() => {
    setCurrentPage(1);
  }, [todosPerPage]);

  useEffect(() => {
    if (currentTodos.length === 0) {
      setCurrentPage(1);
    }
  }, [currentTodos.length]);

  useEffect(() => {
    dispatch(makeFiltersAndSortTodos());
  }, [dispatch, todos, queryParams, status]);

  useEffect(() => {
    const indexOfLastPost = currentPage * todosPerPage;
    const indexOfFirstPost = indexOfLastPost - todosPerPage;
    const todosOn1Page = filteredTodos.slice(indexOfFirstPost, indexOfLastPost);
    setCurrentTodos(todosOn1Page);
  }, [currentPage, filteredTodos, todosPerPage]);

  if (fetchTodosLoading || isLoadingUsers) {
    return <Loader />;
  }
  if (fetchTodosErr) {
    toast.error(`Error fetching posts: ${fetchTodosErr}`);
  }
  if (errorUsers) {
    toast.error(`Error fetching users: ${errorUsers}`);
  }
  const handlePageChange = (pageNumber: number) => {
    if (currentPage !== pageNumber) {
      setCurrentPage(pageNumber);
    }
  };
  const pageNumbers = createPageNumbers(filteredTodos.length, todosPerPage);
  const createTodos = () => currentTodos.map((todo) => <Todo todo={todo} key={todo.id} />);

  const handleNewTodo = () => {
    dispatch(setShowModal({ typeModal: 'addNewTodo' }));
  };

  return (
    <Container>
      <div className="todos-container todos__">
        <SelectPageCount
          type="todos"
          name="filter-todosPerPage"
          values={todos}
          valuesPerPage={todosPerPage}
          place="select_todosPage"
        />
        <FilterByTitle filterBy="названию" filterTarget="todos" />
        <div className="sort-container">
          <Button
            type="button"
            className="form__button"
            onClick={() => handleNewTodo()}
          >
            Создать задачу
          </Button>
          <SortingTodos />
        </div>
        {currentTodos.length === 0 ? (
          <p className="text_center">По вашему запросу ничего не найдено</p>
        ) : (
          <ul className="todos_list">
            {createTodos()}
          </ul>
        )}
        <Pagination
          currentPage={currentPage}
          totalPages={pageNumbers.length}
          onPageChange={handlePageChange}
        />
        {activeCheckboxesTodos.length > 0 ? (
          <ButtonsCheckbox
            handleDelete={() => dispatch(setShowModal({ typeModal: 'deleteTodos' }))}
          />
        ) : null}
      </div>
    </Container>
  );
};

export default Todos;
