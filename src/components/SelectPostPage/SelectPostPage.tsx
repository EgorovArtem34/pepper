import { useEffect, ChangeEvent } from 'react';
import * as _ from 'lodash';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { setPostsPerPage } from '../../store/postsSlice';
import { setPostPerPageLocalStorage } from '../../utils/utils';
import './selectPostPage.scss';
import SelectForm from '../Forms/SelectForm/SelectForm';

const postPerPageLocalStorage = localStorage.getItem('postPerPage');

const SelectPostPage = () => {
  const dispatch = useAppDispatch();
  const { posts, postsPerPage } = useAppSelector((state) => state.postsSlice);
  const options = [10, 20, 50, 100, posts.length];

  useEffect(() => {
    if (postPerPageLocalStorage) {
      dispatch(setPostsPerPage(Number(postPerPageLocalStorage)));
    }
  }, [dispatch]);

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const NewPostsPerPage = Number(event.target.value);
    dispatch(setPostsPerPage(NewPostsPerPage));
    setPostPerPageLocalStorage(NewPostsPerPage);
  };

  const makeOptions = () => options.map((option, i) => (
    <option key={_.uniqueId()} value={option} className="select__option">
      {i + 1 === options.length ? 'Все' : option}
    </option>
  ));
  return (
    <SelectForm
      name="filter-postPerPage"
      value={postsPerPage}
      onChange={handleChange}
      place="select_postPage"
      required
      options={options}
      makeOptions={makeOptions}
    >
      Количество постов на странице
    </SelectForm>
  );
};

export default SelectPostPage;
