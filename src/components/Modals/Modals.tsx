import { useAppSelector } from '../../hooks/hooks';
import AddNewPost from './components/AddNewPost';
import DeletePosts from './components/DeletePosts';
import SetLikePosts from './components/SetLikePosts';
import DeleteAlbums from './components/DeleteAlbums';
import DeleteValue from './components/DeleteValue';
import { defineTextModal } from '../../utils/utils';
import SetLikeAlbums from './components/SetLikeAlbums';
import ShowPhoto from './components/ShowPhoto/ShowPhoto';
import AddNewTodo from './components/AddNewTodo';
import UpdateTodo from './components/UpdateTodo';

const Modals = () => {
  const { isModalShow, typeModal, activePostId } = useAppSelector((state) => state.modalsSlice);

  if (!isModalShow) {
    return null;
  }

  const textModal = defineTextModal(typeModal);
  switch (typeModal) {
    case 'deletePost':
    case 'deleteAlbum':
      return (
        <DeleteValue
          id={activePostId as number}
          typeModal={typeModal}
          textModal={textModal}
        />
      );
    case 'deletePosts':
      return <DeletePosts />;
    case 'setFavoritePosts':
      return <SetLikePosts />;
    case 'addNewPost':
      return <AddNewPost />;
    case 'deleteAlbums':
      return <DeleteAlbums />;
    case 'setFavoriteAlbums':
      return <SetLikeAlbums />;
    case 'showPhoto':
      return <ShowPhoto />;
    case 'addNewTodo':
      return <AddNewTodo />;
    case 'updateTodo':
      return <UpdateTodo typeChange="change" />;
    case 'completeTodo':
      return <UpdateTodo typeChange="complete" />;
    default:
      return null;
  }
};

export default Modals;
