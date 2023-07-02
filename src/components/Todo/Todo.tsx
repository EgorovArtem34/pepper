import { ChangeEvent } from 'react';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { TodoType, setCurrentTodo } from '../../store/todosSlice';
import './todo.scss';
import { setShowModal } from '../../store/modalsSlice';
import { addCheckboxTodos, removeCheckboxTodos } from '../../store/checkboxesSlice';
import Button from '../Button/Button';
import Checkbox from '../Checkbox/Checkbox';

const Todo = ({ todo }: { todo: TodoType }) => {
  const dispatch = useAppDispatch();

  const { activeCheckboxesTodos } = useAppSelector((state) => state.checkboxesSlice);

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.checked;
    if (newValue) {
      dispatch(addCheckboxTodos(todo.id));
    } else {
      dispatch(removeCheckboxTodos(todo.id));
    }
    return null;
  };

  const pathClass = cn({
    'second-path': todo.completed === false,
  });

  const liClass = cn('todo', {
    todo_completed: todo.completed === true,
  });

  const handleLiClick = () => {
    dispatch(setCurrentTodo(todo));
    dispatch(setShowModal({ typeModal: 'updateTodo' }));
  };

  const handleCircleClick = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.stopPropagation();
    dispatch(setCurrentTodo(todo));
    dispatch(setShowModal({ typeModal: 'completeTodo' }));
  };

  return (
    <li className={liClass}>
      <div className="todo__interface">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-circle" viewBox="0 0 16 16" onClick={handleCircleClick}>
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path className={pathClass} d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
          </svg>
        </div>
        <Button
          type="button"
          onClick={() => handleLiClick()}
          className="todo__button"
        >
          <span className="todo__title">{todo.title}</span>
        </Button>
      </div>
      <Checkbox
        name="checkbox-todo"
        id="checkbox-todo"
        checked={activeCheckboxesTodos.includes(todo.id)}
        onChange={handleCheckboxChange}
        isLabel={false}
      />
    </li>
  );
};

export default Todo;
