import dynamic from 'next/dynamic';
import {
  EmojiHappyIcon,
  LocationMarkerIcon,
  PhotographIcon,
} from '@heroicons/react/outline';
import React from 'react';
import PostCreateAction from './PostCreateAction';
import TrianglePointer from '../icons/TrianglePointer';

const DynamicEmojiPickerWithNoSSR = dynamic(
  () => import('emoji-picker-react'),
  { ssr: false }
);

const PostCreateActions = ({
  showEmojis,
  showEmojisHandler,
  postCreateImageHandler,
  postCreateEmojiHandler,
  postCreateLocationHandler,
}) => {
  return (
    <div className='flex items-center'>
      <PostCreateAction
        className={'relative'}
        Icon={PhotographIcon}
        onClick={postCreateImageHandler}
      />
      <PostCreateAction
        Icon={EmojiHappyIcon}
        className={'relative'}
        onClick={showEmojisHandler}
      >
        {showEmojis && (
          <>
            <TrianglePointer
              className={
                'absolute inline-block fill-white stroke-slate-200 h-5 w-5 align-bottom top-5 left-0 drop-shadow'
              }
            />
            <div
              className={
                'absolute z-10 mt-1 w-80 h-[400px] left-[-150px] top-7 bg-white shadow-sm rounded-lg '
              }
            >
              <DynamicEmojiPickerWithNoSSR
                onEmojiClick={postCreateEmojiHandler}
                searchPlaceholder={'Search emojis'}
              />
            </div>
          </>
        )}
      </PostCreateAction>
      <PostCreateAction
        Icon={LocationMarkerIcon}
        onClick={postCreateLocationHandler}
      />
    </div>
  );
};

export default PostCreateActions;
