import { useEffect, useState } from 'react';
import { Container, Pagination } from 'react-bootstrap';
import Loader from '../Loader/Loader';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchPosts, makeFiltersPosts } from '../../store/postsSlice';
import { createPageNumbers } from '../../utils/utils';
import Post from '../Post/Post';
import { fetchUsers } from '../../store/usersSlice';
import Button from '../Button/Button';
import './posts.scss';
import { setShowModal } from '../../store/modalsSlice';
import SelectPostPage from '../SelectPostPage/SelectPostPage';
import FiltersPost from '../FiltersPost/FiltersPost';
import { PostType } from '../../types';
import SortingPosts from '../SortingPost/SortingPost';

const Posts = () => {
  const dispatch = useAppDispatch();
  const selectedPostFilters = useAppSelector((state) => state.filtersSlice.posts);
  const { activeCheckboxes } = useAppSelector((state) => state.checkboxesSlice);
  const {
    isLoadings: { fetchPostsLoading },
    errors: { fetchPostsErr },
    posts,
    filteredPost,
    postsPerPage,
  } = useAppSelector((state) => state.postsSlice);
  const { isLoading: isLoadingUsers, error: errorUsers } = useAppSelector(
    (state) => state.usersSlice,
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPosts, setCurrentPosts] = useState<PostType[]>([]);

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredPost]);

  useEffect(() => {
    dispatch(makeFiltersPosts(selectedPostFilters));
  }, [dispatch, selectedPostFilters, posts]);

  useEffect(() => {
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const postsOn1Page = filteredPost.slice(indexOfFirstPost, indexOfLastPost);
    setCurrentPosts(postsOn1Page);
  }, [currentPage, filteredPost, posts, postsPerPage]);

  const handlePageChange = (pageNumber: number) => {
    if (currentPage !== pageNumber) {
      setCurrentPage(pageNumber);
    }
  };
  const pageNumbers = createPageNumbers(filteredPost.length, postsPerPage);
  const createPosts = () => currentPosts.map((post) => <Post post={post} key={post.id} />);

  return (
    <Container>
      {fetchPostsErr || errorUsers ? <span>{fetchPostsErr || errorUsers}</span> : null}
      {fetchPostsLoading || isLoadingUsers ? <Loader /> : null}
      <SelectPostPage />
      <FiltersPost />
      <SortingPosts />
      {currentPosts.length === 0 ? (
        <p className="text_center">По вашему запросу ничего не найдено</p>
      ) : (
        createPosts()
      )}
      <Pagination>
        {pageNumbers.map((pageNumber) => (
          <Pagination.Item
            key={pageNumber}
            active={pageNumber === currentPage}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </Pagination.Item>
        ))}
      </Pagination>
      {activeCheckboxes.length > 0 ? (
        <div className="buttons_checkbox">
          <Button
            type="button"
            className="form__button button__back"
            onClick={() => dispatch(setShowModal({ typeModal: 'deletePosts' }))}
          >
            Удалить
          </Button>
          <Button
            type="submit"
            className="form__button button__submit"
            onClick={() => dispatch(setShowModal({ typeModal: 'setFavoritePosts' }))}
          >
            В избранное
          </Button>
        </div>
      ) : null}
    </Container>
  );
};

export default Posts;
