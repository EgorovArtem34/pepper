import { CommentProps } from '../../types';
import Loader from '../Loader/Loader';

const Comment = ({ comment, isLoading, error }: CommentProps) => {
  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <span>{error}</span>;
  }
  if (Object.keys(comment).length === 0) {
    <span>Комментариев нет</span>;
  }

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{comment.email}</h5>
        <p className="card-text">{comment.body}</p>
      </div>
    </div>
  );
};

export default Comment;
