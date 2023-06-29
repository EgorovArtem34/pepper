import { useState, useEffect, ChangeEvent } from 'react';
import cn from 'classnames';
import { Collapse } from 'react-bootstrap';
import { FaRegComment, FaCommentSlash } from 'react-icons/fa';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from 'react-icons/md';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import {
  CommentsStateType, PostType, CommentType, UserType,
} from '../../types';
import { fetchCommentsById } from '../../store/commentsSlice';
import Comment from '../Comment/Comment';
import ChangePost from '../ChangePost/ChangePost';
import { setShowModal } from '../../store/modalsSlice';
import { setFavoritePost } from '../../store/postsSlice';
import { setFavoriteLocalStorage } from '../../utils/utils';
import Checkbox from '../Checkbox/Checkbox';
import { addCheckbox, removeCheckbox } from '../../store/checkboxesSlice';
import './post.scss';

const Post = ({ post }: { post: PostType }) => {
  const dispatch = useAppDispatch();
  const { comments, error, isLoading }: CommentsStateType = useAppSelector(
    (state) => state.commentsSlice,
  );
  const { activeCheckboxes } = useAppSelector((state) => state.checkboxesSlice);
  const { users } = useAppSelector((state) => state.usersSlice);
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const currentComments = comments[post.id] || [];
  const [isOpenCollapse, setIsOpenCollapse] = useState(false);
  const [isChangePost, setIsChangePost] = useState(false);

  useEffect(() => {
    setCurrentUser(users.find((user) => user.id === post.userId) as UserType);
  }, [post, currentUser, users]);

  const handleFavorite = () => {
    dispatch(setFavoritePost(post.id));
    setFavoriteLocalStorage(post.id, !post.isFavorite);
  };

  const handleClickComment = () => {
    if (!isOpenCollapse) {
      dispatch(fetchCommentsById(post.id));
    }
    setIsOpenCollapse(!isOpenCollapse);
  };

  const handleRemove = () => {
    dispatch(setShowModal({ typeModal: 'deletePost', id: post.id }));
  };
  const cardClass = () => cn('card', 'p-2', 'mb-4', {
    card_favorite: post.isFavorite,
  });

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.checked;
    if (newValue) {
      dispatch(addCheckbox(post.id));
    } else {
      dispatch(removeCheckbox(post.id));
    }
    return null;
  };

  return (
    <div className={cardClass()} key={post.id}>
      <div className="row">
        <div className="px-3">
          <div className="card-block px-6">
            <div className="card__interface">
              <Checkbox
                name="checkbox-interface"
                id="checkbox-interface"
                checked={activeCheckboxes.includes(post.id)}
                onChange={handleCheckboxChange}
                isLabel={false}
              />
              <button onClick={() => handleRemove()} className="card__button" type="button">
                <AiOutlineDelete className="card__icon" />
              </button>
              {!post?.isNew && (
              <button
                onClick={() => handleClickComment()}
                aria-controls="comments"
                aria-expanded={isOpenCollapse}
                className="card__button"
                disabled={isChangePost}
                type="button"
              >
                {isOpenCollapse ? (
                  <FaCommentSlash className="card__icon" />
                ) : (
                  <FaRegComment className="card__icon" />
                )}
              </button>
              )}
              <button onClick={() => setIsChangePost(!isChangePost)} className="card__button" type="button">
                <AiOutlineEdit className="card__icon" />
              </button>
              <button onClick={() => handleFavorite()} className="card__button" type="button">
                {post.isFavorite ? (
                  <MdOutlineFavorite className="card__icon" />
                ) : (
                  <MdOutlineFavoriteBorder className="card__icon" />
                )}
              </button>
            </div>
            {isChangePost ? (
              <ChangePost
                currentUser={currentUser as UserType}
                post={post}
                setIsChangePost={setIsChangePost}
              />
            ) : (
              <>
                <h4 className="card-title">{post.title}</h4>
                <p className="card-text">{post.body}</p>
                <Collapse in={isOpenCollapse}>
                  <div id="comments">
                    {currentComments.map((comment: CommentType) => (
                      <Comment
                        comment={comment}
                        error={error}
                        isLoading={isLoading}
                        key={comment.id}
                      />
                    ))}
                  </div>
                </Collapse>
                <span className="text-muted">{currentUser?.username}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Post;
