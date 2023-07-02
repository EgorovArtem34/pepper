import { useFormik } from 'formik';
import * as yup from 'yup';
import cn from 'classnames';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import Button from '../../Button/Button';
import { setCloseModal } from '../../../../store/modalsSlice';
import { changeTodo } from '../../../../store/todosSlice';
import './updateTodoForm.scss';
import ModalLoader from '../../Modals/components/ModalLoader/ModalLoader';

const UpdateTodoForm = () => {
  const dispatch = useAppDispatch();
  const {
    currentTodo,
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
      try {
        await dispatch(changeTodo(body));
        toast.success('Задача успешно обновлена');
      } catch {
        toast.error('Ошибка при обновлении задачи');
      }
      dispatch(setCloseModal());
    },
  });
  const textareaClass = () => cn('form__textarea', {
    'form__input-error': formik.errors.title && formik.touched.title,
  });

  if (changeTodoLoading) {
    return <ModalLoader />;
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
