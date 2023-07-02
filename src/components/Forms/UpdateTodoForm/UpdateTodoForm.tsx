import { useFormik } from 'formik';
import { ClipLoader } from 'react-spinners';
import * as yup from 'yup';
import cn from 'classnames';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import Loader from '../../Loader/Loader';
import Button from '../../Button/Button';
import { setCloseModal } from '../../../store/modalsSlice';
import { changeTodo } from '../../../store/todosSlice';
import './updateTodoForm.scss';

const UpdateTodoForm = () => {
  const dispatch = useAppDispatch();
  const {
    currentTodo,
    errors: { changeTodoErr },
    isLoadings: { changeTodoLoading },
  } = useAppSelector((state) => state.todosSlice);
  const signUpSchema = yup.object().shape({
    title: yup.string().required().trim(),
  });

  const formik = useFormik({
    initialValues: {
      title: currentTodo?.title,
    },
    validationSchema: signUpSchema,
    onSubmit: async (values) => {
      const body = {
        ...values,
        id: currentTodo?.id,
        completed: currentTodo?.completed,
        userId: currentTodo?.userId,
      };
      await dispatch(changeTodo(body));
      if (changeTodoErr) {
        toast.error(`submit error: ${changeTodoErr}`);
      }
      toast.success('Задача успешно обновлена');
      dispatch(setCloseModal());
    },
  });
  const textareaClass = () => cn('form__textarea', {
    'form__input-error': formik.errors.title && formik.touched.title,
  });

  if (changeTodoLoading) {
    return (
      <div className="loader_center">
        <ClipLoader color="#000" size={54} />
      </div>
    );
  }

  return (
    <form className="form" onSubmit={formik.handleSubmit}>
      <label htmlFor="title" className="form__label">
        Title
        <br />
        <textarea
          name="title"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.title}
          className={textareaClass()}
          required
        />
        {formik.errors.title && formik.touched.title && <p className="form__error-text">{formik.errors.title}</p>}
      </label>
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
          disabled={!formik.isValid || !formik.dirty}
        >
          Обновить
        </Button>
      </div>
    </form>
  );
};

export default UpdateTodoForm;
