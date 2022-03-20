import React, { useContext, useRef, useState } from 'react';
import { TrashIcon } from '@heroicons/react/outline';
import {
  ReplyIcon,
  ThumbDownIcon,
  ThumbUpIcon,
  XCircleIcon,
} from '@heroicons/react/solid';
import { Image } from 'cloudinary-react';
import millify from 'millify';
import { v4 as uuidv4 } from 'uuid';

import CommentsBox from '../comments-box/CommentsBox';
import CommentReplies from './comment-replies/CommentReplies';
import {
  NotificationContext,
  PostContext,
  UserContext,
} from '../../../context';
import { errorsService, postService } from '../../../services';
import { setPost } from '../../../context/Post/PostActions';
import { setNotification } from '../../../context/Notification/NotificationActions';

const ShowReplyContext = React.createContext();

export function useOpenReply() {
  return useContext(ShowReplyContext);
}

const Comment = ({
  id,
  user,
  comment,
  commentLikes,
  commentUnLikes,
  commentReplies,
}) => {
  const { user: loggedInUser } = useContext(UserContext);
  const { dispatch: dispatchPost } = useContext(PostContext);
  const { dispatch } = useContext(NotificationContext);

  const isOwnerOrRoot =
    user?.role === 'root' || user?._id === loggedInUser?._id;

  const [loading, setLoading] = useState(false);

  const [openReply, setOpenReply] = useState(false);
  const [showReplies, setShowReplies] = useState(false);

  const [toggleLike, setToggleLike] = useState(
    commentLikes?.includes(loggedInUser?._id) || false
  );
  const [toggleUnlike, setToggleUnLike] = useState(
    commentUnLikes?.includes(loggedInUser?._id) || false
  );

  const likesRef = useRef(commentLikes?.length || 0);
  const unLikesRef = useRef(commentUnLikes?.length || 0);

  const onLikeCommentHandler = async () => {
    if (toggleUnlike) {
      setToggleLike(true);
      setToggleUnLike(false);
      likesRef.current = likesRef.current + 1;
      unLikesRef.current = unLikesRef.current - 1;
      await postService.updateCommentLikes(id, 1);
    } else if (toggleLike) {
      likesRef.current = likesRef.current - 1;
      setToggleLike(false);
      await postService.updateCommentLikes(id, -1);
    } else {
      setToggleLike(true);
      likesRef.current = likesRef.current + 1;
      await postService.updateCommentLikes(id, 1);
    }
  };

  const onUnlikeCommentHandler = async () => {
    if (toggleLike) {
      setToggleLike(false);
      setToggleUnLike(true);
      unLikesRef.current = unLikesRef.current + 1;
      likesRef.current = likesRef.current - 1;
      await postService.updateCommentLikes(id, 0);
    } else if (toggleUnlike) {
      unLikesRef.current = unLikesRef.current - 1;
      setToggleUnLike(false);
      await postService.updateCommentLikes(id, -1);
    } else {
      setToggleUnLike(true);
      unLikesRef.current = unLikesRef.current + 1;
      await postService.updateCommentLikes(id, 0);
    }
  };

  const onReplyCommentHandler = () => {
    setOpenReply(!openReply);
  };

  const onShowCommentRepliesHandler = () => {
    setShowReplies(!showReplies);
  };

  const onDeleteCommentHandler = async () => {
    try {
      setLoading(true);
      await postService.deleteComment(id);
      dispatchPost(setPost({ update: [0, id] }));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      const message = errorsService.catchErrors(error);
      dispatch(
        setNotification({
          type: 'simple',
          icon: {
            Component: XCircleIcon,
            className: 'text-red-500',
          },
          headline: 'Delete Error',
          message,
        })
      );
    }
  };

  return (
    <div className='flex space-x-3'>
      <div className='flex-shrink-0'>
        <Image
          className='h-10 w-10 rounded-full object-cover'
          cloudName='dmcookpro'
          publicId={user?.profileImageURL}
          alt={user?.name}
          draggable={false}
          width={'100%'}
          height={'100%'}
        />
      </div>
      <div className='w-full'>
        <div className='bg-slate-100 rounded-md p-3 relative font-hind w-full'>
          <div className='text-sm flex justify-between'>
            <div className='flex space-x-2'>
              <a href='#' className='font-medium text-sm text-slate-800'>
                {user?.name}
              </a>
              <span className='text-sm text-slate-500'>2d</span>
            </div>
            {isOwnerOrRoot && (
              <TrashIcon
                onClick={onDeleteCommentHandler}
                className='h-4 w-4 text-slate-300 hover:text-slate-500 flex'
                role={'button'}
              />
            )}
          </div>
          <div className='mt-1 text-sm text-slate-800'>
            <p>{comment}</p>
          </div>
          <div className='absolute bottom-0 right-0 transform translate-y-1/2 -translate-x-1.5 shadow-md rounded-full p-1 flex space-x-1 bg-white items-center cursor-pointer'>
            {likesRef.current + unLikesRef.current >= 1 && (
              <div className='flex -space-x-1 relative z-0 overflow-hidden'>
                {unLikesRef.current >= 1 && (
                  <div className='bg-red-500 p-1 rounded-full relative z-30 ring-1 ring-white'>
                    <ThumbDownIcon className='text-white h-3 w-3 block' />
                  </div>
                )}
                {likesRef.current >= 1 && (
                  <div className='bg-violet-600 p-1 rounded-full relative z-20 ring-1 ring-white'>
                    <ThumbUpIcon className='text-white h-3 w-3 block' />
                  </div>
                )}
              </div>
            )}
            {likesRef.current + unLikesRef.current > 1 && (
              <span className='text-xs leading-none'>
                {millify(likesRef.current + unLikesRef.current)}
              </span>
            )}
          </div>
        </div>
        <div
          className={`${
            commentReplies?.length > 0 ? 'mt-3' : 'my-4'
          } text-sm flex space-x-4 items-center`}
        >
          <ThumbUpIcon
            className={`${
              toggleLike ? 'text-violet-600' : 'text-slate-400'
            } h-5 w-5`}
            role={'button'}
            onClick={onLikeCommentHandler}
          />
          <ThumbDownIcon
            className={`${
              toggleUnlike ? 'text-red-500' : 'text-slate-400'
            } h-5 w-5`}
            role={'button'}
            onClick={onUnlikeCommentHandler}
          />
          <button
            type='button'
            onClick={onReplyCommentHandler}
            className={'text-slate-800 font-medium text-sm'}
          >
            Reply
          </button>
        </div>

        {commentReplies?.length > 0 && (
          <div
            className='my-4 text-sm text-slate-600 flex space-x-3 items-center font-hind cursor-pointer'
            role={'button'}
            onClick={onShowCommentRepliesHandler}
          >
            <ReplyIcon className='h-4 w-4 rotate-180' />
            <span className='font-medium text-'>
              {commentReplies?.length === 1
                ? 'View Reply'
                : `${commentReplies?.length} Replies`}
            </span>
          </div>
        )}
        {showReplies && (
          <section aria-describedby='comment-replies'>
            {commentReplies?.map((reply) => (
              <CommentReplies parentid={id} data={reply} key={uuidv4()} />
            ))}
          </section>
        )}
        <ShowReplyContext.Provider value={onReplyCommentHandler}>
          {openReply && <CommentsBox parentid={id} autoFocus={true} />}
        </ShowReplyContext.Provider>
      </div>
    </div>
  );
};

export default Comment;
