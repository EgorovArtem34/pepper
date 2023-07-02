import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import Button from '../../Button/Button';
import { setCloseModal } from '../../../store/modalsSlice';
import { changeTodo } from '../../../store/todosSlice';
import './completedTodoForm.scss';

const CompletedTodoForm = () => {
  const dispatch = useAppDispatch();
  const {
    currentTodo,
    errors: { changeTodoErr },
    isLoadings: { changeTodoLoading },
  } = useAppSelector((state) => state.todosSlice);

  const handleSubmit = async () => {
    const body = {
      completed: !currentTodo?.completed,
      title: currentTodo?.title,
      id: currentTodo?.id,
      userId: currentTodo?.userId,
    };
    await dispatch(changeTodo(body));

    if (changeTodoErr) {
      toast.error(`submit error: ${changeTodoErr}`);
    }
    toast.success('Задача успешно обновлена');
    dispatch(setCloseModal());
  };

  if (changeTodoLoading) {
    return (
      <div className="loader_center">
        <ClipLoader color="#000" size={54} />
      </div>
    );
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      {currentTodo?.completed
        ? <span className="form__complete-text">Вы хотите отметить задачу как невыполненную?</span>
        : <span className="form__complete-text">Вы хотите отметить задачу как выполненную?</span>}
      <div className="form__button-wrap">
        <Button
          type="button"
          className="form__button button__back"
          onClick={() => dispatch(setCloseModal())}
        >
          Назад
        </Button>
        <Button
          type="submit"
          className="form__button button__submit"
        // disabled={!formik.isValid || !formik.dirty}
        >
          Подтвердить
        </Button>
      </div>
    </form>
  );
};

export default CompletedTodoForm;
