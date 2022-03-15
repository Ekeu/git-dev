import { LocationMarkerIcon } from '@heroicons/react/outline';
import React from 'react';

const PostLocation = ({ location, openSearchModal }) => {
  return (
    <div className='flex flex-nowrap justify-end py-2 px-2 space-x-2 sm:px-3'>
      <div className='flex-shrink-0'>
        <div className='relative'>
          <div
            role={'button'}
            onClick={openSearchModal}
            className='relative inline-flex items-center rounded-full py-2 px-3 bg-violet-50 text-sm font-medium text-violet-500 whitespace-nowrap hover:bg-violet-100 cursor-pointer'
          >
            <LocationMarkerIcon
              className={'flex-shrink-0 h-4 w-4 sm:-ml-1 text-violet-500'}
              aria-hidden='true'
            />
            <span className={'truncate ml-2 block text-xs text-violet-500'}>
              {location}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostLocation;
