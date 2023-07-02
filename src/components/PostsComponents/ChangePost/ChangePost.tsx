import { useFormik } from 'formik';
import * as yup from 'yup';
import cn from 'classnames';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { InputNameType, PostType, UserType } from '../../../types';
import Button from '../../CommonComponents/Button/Button';
import './changePost.scss';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { changePost } from '../../../store/postsSlice';
import ModalLoader from '../../CommonComponents/Modals/components/ModalLoader/ModalLoader';

const ChangePost = ({ currentUser, post, setIsChangePost }:
{
  currentUser: UserType,
  post: PostType,
  setIsChangePost: (value: boolean) => void
}) => {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.usersSlice);
  const {
    errors: { changePostErr },
    isLoadings: { changePostLoading },
  } = useAppSelector((state) => state.postsSlice);
  const userNamesIds = users.map((user) => [user.id, user.username]);
  const signUpSchema = yup.object().shape({
    title: yup.string().required(),
    body: yup.string().required().trim(),
    userId: yup.number().required(),
  });
  const formik = useFormik({
    initialValues: {
      title: post?.title,
      body: post?.body,
      userId: currentUser?.id,
    },
    validationSchema: signUpSchema,
    onSubmit: async (values) => {
      const body = {
        ...values,
        userId: Number(values.userId),
        id: post.id,
      };
      await dispatch(changePost(body));
      if (changePostErr) {
        toast.error(`submit error: ${changePostErr}`);
      }
      toast.success('Пост успешно обновлен');
      setIsChangePost(false);
    },
  });
  const inputClass = (type: InputNameType) => cn('form__input', {
    'form__input-error': formik.errors[type] && formik.touched[type],
  });
  const textareaClass = () => cn('form__textarea', {
    'form__input-error': formik.errors.body && formik.touched.body,
  });

  if (changePostLoading) {
    return <ModalLoader />;
  }
  return (
    <form className="form" onSubmit={formik.handleSubmit}>
      <label htmlFor="title" className="form__label">
        Title
        <br />
        <input
          type="text"
          name="title"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.title}
          className={inputClass('title')}
          required
        />
        {formik.errors.title && formik.touched.title && <p className="form__error-text">{formik.errors.title}</p>}
      </label>
      <label htmlFor="body" className="form__label">
        Body
        <br />
        <textarea
          name="body"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.body}
          className={textareaClass()}
          required
        />
        {formik.errors.body && formik.touched.body && <p className="form__error-text">{formik.errors.body}</p>}
      </label>
      <label htmlFor="userId" className="form__label">
        Author
        <br />
        <select
          name="userId"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          defaultValue={formik.values.userId}
          className={inputClass('userId')}
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
          onClick={() => setIsChangePost(false)}
        >
          Назад
        </Button>
        <Button
          type="submit"
          className="form__button button__submit"
          disabled={!formik.isValid || !formik.dirty}
        >
          Изменить
        </Button>
      </div>
    </form>
  );
};

export default ChangePost;
