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
    </>
  );
};

CustomNotification.propTypes = {};

export default CustomNotification;
