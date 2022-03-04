import { Image } from 'cloudinary-react';
import React from 'react';

const AlgoliaItem = ({ item, components, router }) => {
  return (
    <div
      onClick={() => router.push(`/${item?.username}`)}
      className='py-2 flex'
    >
      <Image
        className='h-10 w-10 rounded-full object-cover'
        cloudName='dmcookpro'
        publicId={item?.profileImageURL}
        alt={item?.username}
        draggable={false}
        loading='lazy'
        width={'100%'}
        height={'100%'}
      ></Image>
      <div className='ml-3'>
        <p className='text-sm font-medium font-lato text-slate-800'>
          <components.Snippet hit={item} attribute={'name'} />
        </p>
        <p className='text-sm text-slate-500'>{item?.username}</p>
      </div>
    </div>
  );
};

export default AlgoliaItem;
