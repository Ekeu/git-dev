import React from 'react';
import Button from '../common/button/Button';

const PostCreateAction = ({ className, children, Icon, ...otherProps }) => {
  return (
    <div className='flex items-center p-2 rounded-full hover:bg-violet-100 focus-within:bg-transparent'>
      <div
        className={`rounded-full flex items-center justify-center text-violet-500 hover:text-violet-500 ${className}`}
      >
        <Icon
          className='h-6 w-6 cursor-pointer'
          aria-hidden='true'
          {...otherProps}
        />
        {children}
      </div>
    </div>
  );
};

export default PostCreateAction;
