import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../Loader/Loader';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { setShowModal } from '../../store/modalsSlice';
import { AlbumType, fetchAlbums, filterAndSortAlbums } from '../../store/albumsSlice';
import { createPageNumbers } from '../../utils/utils';
import SelectPageCount from '../SelectPostPage/SelectPageCount';
import Pagination from '../Pagination/Pagination';
import Album from '../Album/Album';
import { fetchUsers } from '../../store/usersSlice';
import ButtonsCheckbox from '../ButtonsCheckbox/ButtonsCheckbox';
import FiltersSortAlbums from '../FiltersSortAlbums/FiltersSortAlbums';
import SortingValues from '../SortingValues/SortingValues';
import './albums.scss';

const Albums = () => {
  const dispatch = useAppDispatch();
  const { activeCheckboxesAlbums } = useAppSelector((state) => state.checkboxesSlice);
  const {
    albums,
    filteredAndSortedAlbums,
    albumsPerPage,
    errors: {
      fetchAlbumsErr,
    },
    isLoadings: {
      fetchAlbumsLoading,
    },
  } = useAppSelector((state) => state.albumsSlice);
  const selectedAlbumsFilters = useAppSelector((state) => state.filtersSlice.albums);
  const {
    isLoading: isLoadingUsers,
    error: errorUsers,
    users,
  } = useAppSelector((state) => state.usersSlice);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentAlbums, setCurrentAlbums] = useState<AlbumType[]>([]);

  useEffect(() => {
    dispatch(fetchAlbums());
    if (users.length === 0) {
      dispatch(fetchUsers());
    }
  }, [dispatch, users.length]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedAlbumsFilters, albumsPerPage]);

  useEffect(() => {
    if (currentAlbums.length === 0) {
      setCurrentPage(1);
    }
  }, [currentAlbums.length]);

  useEffect(() => {
    dispatch(filterAndSortAlbums(selectedAlbumsFilters));
  }, [dispatch, selectedAlbumsFilters, albums]);

  useEffect(() => {
    const indexOfLastAlbum = currentPage * albumsPerPage;
    const indexOfFirstAlbum = indexOfLastAlbum - albumsPerPage;
    const albumsOn1Page = filteredAndSortedAlbums.slice(indexOfFirstAlbum, indexOfLastAlbum);
    setCurrentAlbums(albumsOn1Page);
  }, [currentPage, filteredAndSortedAlbums, albumsPerPage]);

  if (fetchAlbumsLoading || isLoadingUsers) {
    return <Loader />;
  }
  if (fetchAlbumsErr) {
    toast.error(`Error fetching albums: ${fetchAlbumsErr}`);
  }
  if (errorUsers) {
    toast.error(`Error fetching users: ${errorUsers}`);
  }
  const handlePageChange = (pageNumber: number) => {
    if (currentPage !== pageNumber) {
      setCurrentPage(pageNumber);
    }
  };
  const pageNumbers = createPageNumbers(filteredAndSortedAlbums.length, albumsPerPage);
  const createAlbums = () => currentAlbums.map((album) => <Album album={album} key={album.id} />);
  return (
    <Container>
      <SelectPageCount
        type="albums"
        name="filter-albumsPerPage"
        values={albums}
        valuesPerPage={albumsPerPage}
        place="select_albumsPage"
      />
      <FiltersSortAlbums />
      <div className="sort-container">
        <SortingValues
          sortTarget="albums"
          selectedSort={selectedAlbumsFilters}
        />
      </div>
      {currentAlbums.length === 0 ? (
        <p className="text_center">По вашему запросу ничего не найдено</p>
      ) : (
        createAlbums()
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={pageNumbers.length}
        onPageChange={handlePageChange}
      />
      {activeCheckboxesAlbums.length > 0 ? (
        <ButtonsCheckbox
          handleDelete={() => dispatch(setShowModal({ typeModal: 'deleteAlbums' }))}
          handleFavorite={() => dispatch(setShowModal({ typeModal: 'setFavoriteAlbums' }))}
        />
      ) : null}
    </Container>
  );
};

export default Albums;
