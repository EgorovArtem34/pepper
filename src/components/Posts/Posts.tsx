import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Loader from '../Loader/Loader';
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchPosts, makeFiltersPosts } from '../../store/postsSlice';
import { createPageNumbers } from '../../utils/utils';
import Post from '../Post/Post';
import { fetchUsers } from '../../store/usersSlice';
import Button from '../Button/Button';
import './posts.scss';
import { setShowModal } from '../../store/modalsSlice';
import SelectPageCount from '../SelectPostPage/SelectPageCount';
import FiltersPost from '../FiltersPost/FiltersPost';
import { PostType } from '../../types';
import SortingValues from '../SortingValues/SortingValues';
import Pagination from '../Pagination/Pagination';
import ButtonsCheckbox from '../ButtonsCheckbox/ButtonsCheckbox';

const Posts = () => {
  const dispatch = useAppDispatch();
  const selectedPostFilters = useAppSelector((state) => state.filtersSlice.posts);
  const { activeCheckboxesPosts } = useAppSelector((state) => state.checkboxesSlice);
  const {
    isLoadings: { fetchPostsLoading },
    errors: { fetchPostsErr },
    posts,
    filteredPost,
    postsPerPage,
  } = useAppSelector((state) => state.postsSlice);
  const {
    isLoading: isLoadingUsers,
    error: errorUsers,
    users,
  } = useAppSelector((state) => state.usersSlice);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPosts, setCurrentPosts] = useState<PostType[]>([]);

  useEffect(() => {
    dispatch(fetchPosts());
    if (users.length === 0) {
      dispatch(fetchUsers());
    }
  }, [dispatch, users.length]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedPostFilters.queryParams, selectedPostFilters.status, postsPerPage]);

  useEffect(() => {
    if (currentPosts.length === 0) {
      setCurrentPage(1);
    }
  }, [currentPosts.length]);

  useEffect(() => {
    dispatch(makeFiltersPosts(selectedPostFilters));
  }, [dispatch, selectedPostFilters.queryParams, selectedPostFilters.status, posts]);

  useEffect(() => {
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const postsOn1Page = filteredPost.slice(indexOfFirstPost, indexOfLastPost);
    setCurrentPosts(postsOn1Page);
  }, [currentPage, filteredPost, postsPerPage]);

  if (fetchPostsLoading || isLoadingUsers) {
    return <Loader />;
  }
  if (fetchPostsErr) {
    toast.error(`Error fetching posts: ${fetchPostsErr}`);
  }
  if (errorUsers) {
    toast.error(`Error fetching users: ${errorUsers}`);
  }
  const handlePageChange = (pageNumber: number) => {
    if (currentPage !== pageNumber) {
      setCurrentPage(pageNumber);
    }
  };
  const pageNumbers = createPageNumbers(filteredPost.length, postsPerPage);
  const createPosts = () => currentPosts.map((post) => <Post post={post} key={post.id} />);

  const handleNewPost = () => {
    dispatch(setShowModal({ typeModal: 'addNewPost' }));
  };

  return (
    <Container>
      <SelectPageCount
        type="posts"
        name="filter-postsPerPage"
        values={posts}
        valuesPerPage={postsPerPage}
        place="select_postsPage"
      />
      <FiltersPost />
      <div className="sort-container">
        <Button
          type="button"
          className="form__button form__button_sort-btn"
          onClick={() => handleNewPost()}
        >
          Создать пост
        </Button>
        <SortingValues
          sortTarget="posts"
          selectedSort={selectedPostFilters}
        />
      </div>
      {currentPosts.length === 0 ? (
        <p className="text_center">По вашему запросу ничего не найдено</p>
      ) : (
        createPosts()
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={pageNumbers.length}
        onPageChange={handlePageChange}
      />
      {activeCheckboxesPosts.length > 0 ? (
        <ButtonsCheckbox
          handleDelete={() => dispatch(setShowModal({ typeModal: 'deletePosts' }))}
          handleFavorite={() => dispatch(setShowModal({ typeModal: 'setFavoritePosts' }))}
        />
      ) : null}
    </Container>
  );
};

export default Posts;
