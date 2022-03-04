import React from 'react';
import {
  ChatAltIcon,
  EyeIcon,
  ShareIcon,
  ThumbUpIcon,
} from '@heroicons/react/solid';

const PostActions = () => {
  return (
    <div className='mt-6 flex justify-between space-x-8'>
      <div className='flex space-x-6'>
        <span className='inline-flex items-center text-sm'>
          <button
            type='button'
            className='inline-flex space-x-2 text-gray-400 hover:text-gray-500'
          >
            <ThumbUpIcon className='h-5 w-5' aria-hidden='true' />
            <span className='font-medium text-gray-900'>{question.likes}</span>
            <span className='sr-only'>likes</span>
          </button>
        </span>
        <span className='inline-flex items-center text-sm'>
          <button
            type='button'
            className='inline-flex space-x-2 text-gray-400 hover:text-gray-500'
          >
            <ChatAltIcon className='h-5 w-5' aria-hidden='true' />
            <span className='font-medium text-gray-900'>
              {question.replies}
            </span>
            <span className='sr-only'>replies</span>
          </button>
        </span>
        <span className='inline-flex items-center text-sm'>
          <button
            type='button'
            className='inline-flex space-x-2 text-gray-400 hover:text-gray-500'
          >
            <EyeIcon className='h-5 w-5' aria-hidden='true' />
            <span className='font-medium text-gray-900'>{question.views}</span>
            <span className='sr-only'>views</span>
          </button>
        </span>
      </div>
      <div className='flex text-sm'>
        <span className='inline-flex items-center text-sm'>
          <button
            type='button'
            className='inline-flex space-x-2 text-gray-400 hover:text-gray-500'
          >
            <ShareIcon className='h-5 w-5' aria-hidden='true' />
            <span className='font-medium text-gray-900'>Share</span>
          </button>
        </span>
      </div>
    </div>
  );
};

export default PostActions;
