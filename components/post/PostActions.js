import React, { useState } from 'react';
import { ChatAltIcon, HeartIcon, ShareIcon } from '@heroicons/react/outline';
import millify from 'millify';

import PostAction from './PostAction';
import RetweetIcon from '../icons/RetweetIcon';

const PostActions = ({
  postLikes,
  postClones,
  onLikePostHandler,
  onClonePostHandler,
  user,
}) => {
  const isLiked = postLikes.includes(user?._id);
  const isCloned = postClones.includes(user?._id);
  const [action, setAction] = useState('like');
  const [animationCounter, setAnimationCounter] = useState(
    'inline-flex opacity-100 translate-x-0 translate-y-0 duration-100 ease-in-out'
  );

  const handleAnimationCounter = (action, onClickHandler, check, length) => {
    setAction(action);
    if (check && length <= 1) {
      setTimeout(
        () =>
          setAnimationCounter(
            'inline-flex opacity-100 translate-x-0 translate-y-2 duration-100 ease-in-out'
          ),
        0
      );

      setTimeout(() => onClickHandler(), 100);
      setTimeout(
        () =>
          setAnimationCounter(
            'inline-flex opacity-0 translate-x-0 translate-y-5 duration-100 ease-in-out'
          ),
        100
      );

      return;
    }

    if (check) {
      setTimeout(
        () =>
          setAnimationCounter(
            'inline-flex opacity-0 translate-x-0 translate-y-2 duration-100 ease-in-out'
          ),
        0
      );
      setTimeout(() => onClickHandler(), 100);
      setTimeout(
        () =>
          setAnimationCounter(
            'inline-flex opacity-100 translate-x-0 translate-y-0 duration-100 ease-in-out'
          ),
        200
      );

      return;
    }

    setTimeout(
      () =>
        setAnimationCounter(
          'inline-flex opacity-0 translate-x-0 -translate-y-2 duration-100 ease-in-out'
        ),
      0
    );
    setTimeout(() => onClickHandler(), 100);
    setTimeout(
      () =>
        setAnimationCounter(
          'inline-flex opacity-100 translate-x-0 translate-y-0 duration-100 ease-in-out'
        ),
      200
    );
  };

  return (
    <div className='mt-6 flex justify-between space-x-8'>
      <div className='flex space-x-6'>
        <PostAction
          containerClassName={'group'}
          buttonClassname={'items-center'}
          iconContainerClassName={'p-1 rounded-full group-hover:bg-rose-100'}
          iconClassName={`${
            isLiked ? 'text-rose-500 fill-rose-500' : 'text-slate-500'
          } group-hover:text-rose-500`}
          childrenClassName={`${
            isLiked ? 'text-rose-500' : 'text-slate-500'
          } group-hover:text-rose-500 mt-1 ${
            action === 'like' && animationCounter
          }`}
          onClick={() =>
            handleAnimationCounter(
              'like',
              onLikePostHandler,
              isLiked,
              postLikes.length
            )
          }
          Icon={HeartIcon}
        >
          {postLikes.length > 0 && millify(postLikes.length)}
        </PostAction>
        <PostAction
          containerClassName={'group'}
          buttonClassname={'items-center'}
          iconContainerClassName={'p-1 rounded-full group-hover:bg-sky-100'}
          iconClassName={'text-slate-500 group-hover:text-sky-500'}
          childrenClassName={'text-slate-500 group-hover:text-sky-500 mt-1'}
          Icon={ChatAltIcon}
        >
          5,436
        </PostAction>
        <PostAction
          containerClassName={'group'}
          buttonClassname={'items-center'}
          iconContainerClassName={'p-1 rounded-full group-hover:bg-green-100'}
          iconClassName={`${
            isCloned ? 'fill-green-500' : 'fill-slate-500'
          } group-hover:fill-green-500`}
          childrenClassName={`${
            isCloned ? 'text-green-500' : 'text-slate-500'
          } group-hover:text-green-500 mt-1 ${
            action === 'clone' && animationCounter
          }`}
          onClick={() =>
            handleAnimationCounter(
              'clone',
              onClonePostHandler,
              isCloned,
              postClones.length
            )
          }
          Icon={RetweetIcon}
        >
          {postClones.length > 0 && millify(postClones.length)}
        </PostAction>
      </div>
      <div className='flex'>
        <PostAction
          containerClassName={'group'}
          buttonClassname={'items-center'}
          iconContainerClassName={'p-1 rounded-full group-hover:bg-violet-100'}
          iconClassName={'text-slate-500 group-hover:text-violet-500'}
          childrenClassName={'text-slate-500 group-hover:text-violet-500 mt-1'}
          Icon={ShareIcon}
        >
          Share
        </PostAction>
      </div>
    </div>
  );
};

export default PostActions;
