import { useAppSelector } from '../../hooks/hooks';
import AddNewPost from './components/AddNewPost';
import DeletePost from './components/DeletePost';
import DeletePosts from './components/DeletePosts';
import SetLikePosts from './components/SetLikePosts';

const Modals = () => {
  const { isModalShow, typeModal, activePostId } = useAppSelector((state) => state.modalsSlice);

  if (!isModalShow) {
    return null;
  }
  console.log(typeModal);
  switch (typeModal) {
    case 'deletePost':
      return <DeletePost id={activePostId as number} />;
    case 'deletePosts':
      return <DeletePosts />;
    case 'setFavoritePosts':
      return <SetLikePosts />;
    case 'addNewPost':
      return <AddNewPost />;
    default:
      return null;
  }
};

export default Modals;
