import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import {
  TrashIcon,
  DotsHorizontalIcon,
  FlagIcon,
  StarIcon,
} from '@heroicons/react/outline';

import MenuIconLink from '../navbar/MenuIconLink';

const PostMenu = ({ onOpenModalHandler, user, post }) => {
  const isOwnerOrRoot = user?.role === 'root' || post?.user?._id === user?._id;
  return (
    <Menu as='div' className='relative inline-block text-left font-hind'>
      <div>
        <Menu.Button
          as='div'
          className='group -m-2 p-2 flex items-center !duration-200 min-w-0 whitespace-nowrap text-slate-600 hover:text-violet-600 transition-colors'
        >
          <div className='inline-flex cursor-pointer'>
            <div className='bg-transparent group-hover:bg-violet-200 outline-none transition-colors !duration-200 absolute top-0 right-0 left-0 bottom-0 -m-2 inline-flex rounded-full'></div>
            <DotsHorizontalIcon
              className='h-5 w-5 select-none align-bottom relative fill-current inline-block'
              aria-hidden='true'
            />
          </div>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items className='origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-opacity-10 ring-slate-400 focus:outline-none z-10'>
          <div className='py-1'>
            <Menu.Item as={'button'} className='w-full'>
              {({ active }) => (
                <MenuIconLink
                  name={'Add to favorites'}
                  iconContainerClassName={
                    '!bg-transparent !p-0 !text-slate-400 !rounded-none'
                  }
                  nameClassName={
                    'text-slate-700 !text-md !font-normal !font-hind'
                  }
                  Icon={StarIcon}
                  className={`${
                    active && 'bg-slate-100'
                  } flex px-4 py-2 text-sm`}
                />
              )}
            </Menu.Item>
            <Menu.Item as={'button'} className='w-full'>
              {({ active }) => (
                <MenuIconLink
                  name={'Report content'}
                  iconContainerClassName={
                    '!bg-transparent !p-0 !text-slate-400 !rounded-none'
                  }
                  nameClassName={
                    'text-slate-700 !text-md !font-normal !font-hind'
                  }
                  Icon={FlagIcon}
                  className={`${
                    active && 'bg-slate-100'
                  } flex px-4 py-2 text-sm`}
                />
              )}
            </Menu.Item>
            {isOwnerOrRoot && (
              <Menu.Item as={'button'} className='w-full'>
                {({ active }) => (
                  <MenuIconLink
                    name={'Delete'}
                    iconContainerClassName={
                      '!bg-transparent !p-0 !text-red-600 !rounded-none'
                    }
                    nameClassName={
                      'text-red-600 !text-md !font-medium !font-hind'
                    }
                    Icon={TrashIcon}
                    role={'button'}
                    onClick={onOpenModalHandler}
                    className={`${
                      active && 'bg-red-100'
                    } flex px-4 py-2 text-sm`}
                  />
                )}
              </Menu.Item>
            )}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default PostMenu;
