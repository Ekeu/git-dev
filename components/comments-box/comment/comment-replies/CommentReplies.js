import React, { useContext, useState } from 'react';
import { TrashIcon } from '@heroicons/react/outline';
import { ThumbDownIcon, ThumbUpIcon } from '@heroicons/react/solid';
import { Image } from 'cloudinary-react';
import millify from 'millify';

import CommentsRepliesBox from '../../comments-box/comment-replies-box/CommentsRepliesBox';

const ShowReplyContext = React.createContext();

export function useOpenReply() {
  return useContext(ShowReplyContext);
}

const CommentReplies = ({ reply }) => {
  const { _id } = reply || {};

  console.log('REPLY ==> ', reply);

  const [openReply, setOpenReply] = useState(false);
  const [toggleLike, setToggleLike] = useState(false);
  const [toggleUnlike, setToggleUnLike] = useState(false);
  const [likes, setLikes] = useState(10);
  const [unlikes, setUnLikes] = useState(11);

  const onLikeCommentHandler = () => {
    if (toggleUnlike) {
      setToggleLike(true);
      setToggleUnLike(false);
      setLikes((prvLikes) => prvLikes + 1);
      setUnLikes((prvUnlikes) => prvUnlikes - 1);
    } else if (toggleLike) {
      setLikes((prvLikes) => prvLikes - 1);
      setToggleLike(false);
    } else {
      setToggleLike(true);
      setLikes((prvLikes) => prvLikes + 1);
    }
  };

  const onUnlikeCommentHandler = () => {
    if (toggleLike) {
      setToggleLike(false);
      setToggleUnLike(true);
      setUnLikes((prvUnlikes) => prvUnlikes + 1);
      setLikes((prvLikes) => prvLikes - 1);
    } else if (toggleUnlike) {
      setUnLikes((prvUnlikes) => prvUnlikes - 1);
      setToggleUnLike(false);
    } else {
      setToggleUnLike(true);
      setUnLikes((prvUnlikes) => prvUnlikes + 1);
    }
  };

  const onReplyCommentHandler = () => {
    setOpenReply(!openReply);
  };

  const onDeleteCommentHandler = () => {};

  return (
    <div className='flex space-x-3'>
      <div className='flex-shrink-0'>
        <Image
          className='h-10 w-10 rounded-full'
          cloudName='dmcookpro'
          publicId={`https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`}
          alt='user'
          draggable={false}
          width={'100%'}
          height={'100%'}
        />
      </div>
      <div>
        <div className='bg-slate-100 rounded-md p-3 relative font-hind'>
          <div className='text-sm flex justify-between'>
            <div className='flex space-x-2'>
              <a href='#' className='font-medium text-sm text-slate-800'>
                Ulrich E
              </a>
              <span className='text-sm text-slate-500'>2d</span>
            </div>
            <TrashIcon
              onClick={onDeleteCommentHandler}
              className='h-4 w-4 text-slate-300 hover:text-slate-500 flex'
              role={'button'}
            />
          </div>
          <div className='mt-1 text-sm text-gray-700'>
            <p>
              Ducimus quas delectus ad maxime totam doloribus reiciendis ex.
              Tempore dolorem maiores. Similique voluptatibus tempore non ut.
            </p>
          </div>
          <div className='absolute bottom-0 right-0 transform translate-y-1/2 -translate-x-1.5 shadow-md rounded-full p-1 flex space-x-1 bg-white items-center cursor-pointer'>
            <div className='flex -space-x-1 relative z-0 overflow-hidden'>
              <div className='bg-red-500 p-1 rounded-full relative z-30 ring-1 ring-white'>
                <ThumbDownIcon className='text-white h-3 w-3 block' />
              </div>
              <div className='bg-violet-600 p-1 rounded-full relative z-20 ring-1 ring-white'>
                <ThumbUpIcon className='text-white h-3 w-3 block' />
              </div>
            </div>
            <span className='text-xs leading-none'>
              {millify(likes + unlikes)}
            </span>
          </div>
        </div>
        <div className='my-4 text-sm flex space-x-4 items-center'>
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

        <ShowReplyContext.Provider value={onReplyCommentHandler}>
          {openReply && <CommentsRepliesBox autoFocus={true} parentid={_id} />}
        </ShowReplyContext.Provider>
      </div>
    </div>
  );
};

export default CommentReplies;
