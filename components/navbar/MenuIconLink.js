import React from 'react';
import { Image } from 'cloudinary-react';

const MenuIconLink = ({
  name,
  info,
  Icon,
  imageALT,
  imageURL,
  className,
  iconClassName,
  nameClassName,
  infoClassName,
  iconContainerClassName,
  ...otherProps
}) => {
  return (
    <div className={`flex-shrink-0 group block ${className}`} {...otherProps}>
      <div className='flex items-center'>
        <div>
          {Icon && (
            <div
              className={`bg-slate-400 text-white flex items-center p-2 rounded-full ${iconContainerClassName}`}
            >
              <Icon className={`h-5 w-5 ${iconClassName}`} aria-hidden='true' />
            </div>
          )}
          {imageURL && (
            <Image
              className='inline-block h-9 w-9 rounded-full object-cover'
              cloudName='dmcookpro'
              publicId={
                imageURL ||
                'https://res.cloudinary.com/dmcookpro/image/upload/v1645542382/git-dev/emoji/10.png'
              }
              alt={imageALT}
              draggable={false}
              width={'100%'}
              height={'100%'}
            ></Image>
          )}
        </div>
        <div className='ml-2'>
          <p className={`text-sm font-inter font-medium ${nameClassName}`}>
            {name}
          </p>
          {info && (
            <p className={`text-xs font-medium font-hind ${infoClassName}`}>
              {info}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuIconLink;
