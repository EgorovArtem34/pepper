import { useEffect, ChangeEvent } from 'react';
import * as _ from 'lodash';
import { useAppDispatch } from '../../hooks/hooks';
import { setPostsPerPage } from '../../store/postsSlice';
import { setValuesPerPageLocalStorage } from '../../utils/utils';
import SelectForm from '../Forms/SelectForm/SelectForm';
import { PostType } from '../../types';
import { AlbumType, setAlbumsPerPage } from '../../store/albumsSlice';
import './selectPageCount.scss';

type SelectPageCountProps = {
  type: 'posts' | 'albums';
  name: string;
  values: PostType[] | AlbumType[];
  valuesPerPage: number;
  place: string;
};

const postPerPageLocalStorage = localStorage.getItem('postsPerPage');
const albumsPerPageLocalStorage = localStorage.getItem('albumsPerPage');

const SelectPageCount = ({
  type, name, values, valuesPerPage, place,
}: SelectPageCountProps) => {
  const dispatch = useAppDispatch();
  const options = [10, 20, 50, 100, values.length];

  useEffect(() => {
    if (postPerPageLocalStorage && type === 'posts') {
      dispatch(setPostsPerPage(Number(postPerPageLocalStorage)));
    }
    if (albumsPerPageLocalStorage && type === 'albums') {
      dispatch(setAlbumsPerPage(Number(albumsPerPageLocalStorage)));
    }
  }, [dispatch, type]);

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const NewValuesPerPage = Number(event.target.value);
    if (type === 'posts') {
      dispatch(setPostsPerPage(NewValuesPerPage));
    }
    if (type === 'albums') {
      dispatch(setAlbumsPerPage(NewValuesPerPage));
    }
    setValuesPerPageLocalStorage(NewValuesPerPage, type);
  };

  const makeOptions = () => options.map((option, i) => (
    <option key={_.uniqueId()} value={option} className="select__option">
      {i + 1 === options.length ? 'Все' : option}
    </option>
  ));
  return (
    <SelectForm
      name={name}
      value={valuesPerPage}
      place={place}
      onChange={handleChange}
      required
      options={options}
      makeOptions={makeOptions}
    >
      Количество постов на странице
    </SelectForm>
  );
};

export default SelectPageCount;
