import { useFormik } from 'formik';
import * as yup from 'yup';
import cn from 'classnames';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import Button from '../../Button/Button';
import { setCloseModal } from '../../../../store/modalsSlice';
import { addTodo } from '../../../../store/todosSlice';
import '../filters.scss';
import ModalLoader from '../../Modals/components/ModalLoader/ModalLoader';

const AddTodoForm = () => {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.usersSlice);
  const {
    isLoadings: { addTodoLoading },
  } = useAppSelector((state) => state.todosSlice);
  const userNamesIds = users.map((user) => [user.id, user.username]);

  const signUpSchema = yup.object().shape({
    title: yup.string().required().trim(),
    userId: yup.number().required(),
  });
  const formik = useFormik({
    initialValues: {
      title: '',
      userId: 1,
    },
    validationSchema: signUpSchema,
    onSubmit: async (values) => {
      const body = {
        title: values.title,
        userId: Number(values.userId),
        completed: false,
      };
      try {
        await dispatch(addTodo(body));
        toast.success('Задача успешно создана');
        dispatch(setCloseModal());
      } catch {
        toast.error('Ошибка при создании');
      }
    },
  });
  const inputClass = () => cn('form__input', {
    'form__input-error': formik.errors.userId && formik.touched.userId,
  });
  const textareaClass = () => cn('form__textarea', {
    'form__input-error': formik.errors.title && formik.touched.title,
  });

  if (addTodoLoading) {
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
      <label htmlFor="userId" className="form__label">
        Author
        <br />
        <select
          name="userId"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          defaultValue={formik.values.userId}
          className={inputClass()}
          required
        >
          {userNamesIds.map((userNameId) => (
            <option key={userNameId[0]} value={userNameId[0]}>
              {userNameId[1]}
            </option>
          ))}
        </select>
        {formik.errors.userId && formik.touched.userId && <p className="form__error-text">{formik.errors.userId}</p>}
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
          Создать
        </Button>
      </div>
    </form>
  );
};

export default AddTodoForm;
