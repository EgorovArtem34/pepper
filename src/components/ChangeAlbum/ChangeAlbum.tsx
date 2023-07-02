import { useFormik } from 'formik';
import * as yup from 'yup';
import cn from 'classnames';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserType } from '../../types';
import Button from '../Button/Button';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import './changeAlbum.scss';
import { AlbumType, changeAlbum } from '../../store/albumsSlice';
import ModalLoader from '../Modals/components/ModalLoader/ModalLoader';

type InputNameType = 'title' | 'userId';

const ChangeAlbum = ({ currentUser, album, setIsChangeAlbum }:
{
  currentUser: UserType,
  album: AlbumType,
  setIsChangeAlbum: (value: boolean) => void
}) => {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.usersSlice);
  const {
    isLoadings: { changeAlbumLoading },
  } = useAppSelector((state) => state.albumsSlice);
  const userNamesIds = users.map((user) => [user.id, user.username]);
  const signUpSchema = yup.object().shape({
    title: yup.string().required(),
    userId: yup.number().required(),
  });
  const formik = useFormik({
    initialValues: {
      title: album?.title,
      userId: currentUser?.id,
    },
    validationSchema: signUpSchema,
    onSubmit: async (values) => {
      try {
        const body = {
          ...values,
          userId: Number(values.userId),
          id: album.id,
        };
        await dispatch(changeAlbum(body));
        toast.success('Альбом успешно обновлен');
      } catch (err) {
        toast.error('Ошибка при изменении альбома');
      }
      setIsChangeAlbum(false);
    },
  });
  const inputClass = (type: InputNameType) => cn('form__input', {
    'form__input-error': formik.errors[type] && formik.touched[type],
  });

  if (changeAlbumLoading) {
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
          onClick={() => setIsChangeAlbum(false)}
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

export default ChangeAlbum;
