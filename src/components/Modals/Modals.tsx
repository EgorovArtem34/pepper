import { useAppSelector } from '../../hooks/hooks';
import DeletePost from './components/DeletePost';
import DeletePosts from './components/DeletePosts';
import SetLikePosts from './components/SetLikePosts';

const Modals = () => {
  const { isModalShow, typeModal, activePostId } = useAppSelector((state) => state.modalsSlice);

  if (!isModalShow) {
    return null;
  }

  switch (typeModal) {
    case 'deletePost':
      return <DeletePost id={activePostId as number} />;
    case 'deletePosts':
      return <DeletePosts />;
    case 'setFavoritePosts':
      return <SetLikePosts />;
    default:
      return null;
  }
};

export default Modals;
