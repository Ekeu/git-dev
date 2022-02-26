import React from 'react';
import PropTypes from 'prop-types';

import { Image } from 'cloudinary-react';

const CustomNotification = ({
  type,
  Icon,
  children,
  avatarURL,
  avatarAlt,
  iconClassName,
  contentClassName,
  ContentComponent,
  actionButtonsContainerClassName,
}) => {
  return (
    <>
      <div className={`${type === 'avatar' && ' w-0 flex-1'} p-4`}>
        <div
          className={`${
            type === 'condensed' ? 'items-center' : 'items-start'
          } flex`}
        >
          {type !== 'condensed' && (
            <div className={`flex-shrink-0 ${type === 'avatar' && 'pt-0.5'}`}>
              {type === 'avatar' ? (
                <Image
                  className='h-10 w-10 rounded-full'
                  cloudName='dmcookpro'
                  publicId={avatarURL}
                  loading='lazy'
                  alt={avatarAlt}
                  draggable={false}
                  width={'100%'}
                  height={'100%'}
                ></Image>
              ) : (
                <Icon
                  className={`h-6 w-6 ${iconClassName}`}
                  aria-hidden='true'
                />
              )}
            </div>
          )}
          <div className={`w-0 flex-1 ${contentClassName}`}>
            {ContentComponent}
          </div>
          {type !== 'avatar' && (
            <div className={actionButtonsContainerClassName}>{children}</div>
          )}
        </div>
      </div>
      {type === 'avatar' && (
        <div className={actionButtonsContainerClassName}>{children}</div>
      )}

      {/* <div className='w-0 flex-1 p-4'>
        <div className='flex items-start'>
          <div className='flex-shrink-0 pt-0.5'>
            <img
              className='h-10 w-10 rounded-full'
              src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80'
              alt=''
            />
          </div>
          <div className='ml-3 w-0 flex-1'>
            <p className='text-sm font-medium text-gray-900'>Emilia Gates</p>
            <p className='mt-1 text-sm text-gray-500'>
              Sure! 8:30pm works great!
            </p>
          </div>
        </div>
      </div>
      <div className='flex border-l border-gray-200'>
        <button
          className='w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500'
          onClick={() => {
            setShow(false);
          }}
        >
          Reply
        </button>
      </div> */}
    </>
  );
};

CustomNotification.propTypes = {};

export default CustomNotification;
