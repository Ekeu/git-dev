import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import {
  TrashIcon,
  DotsHorizontalIcon,
  FlagIcon,
  StarIcon,
} from '@heroicons/react/outline';

import { classNames } from '../../utils/tailwind/tailwind';

const PostMenu = () => {
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
                <span
                  href='#'
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'flex px-4 py-2 text-sm'
                  )}
                >
                  <StarIcon
                    className='mr-3 h-5 w-5 text-gray-400'
                    aria-hidden='true'
                  />
                  <span>Add to favorites</span>
                </span>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href='#'
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'flex px-4 py-2 text-sm'
                  )}
                >
                  <FlagIcon
                    className='mr-3 h-5 w-5 text-gray-400'
                    aria-hidden='true'
                  />
                  <span>Report content</span>
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href='#'
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'flex px-4 py-2 text-sm'
                  )}
                >
                  <TrashIcon
                    className='mr-3 h-5 w-5 text-gray-400'
                    aria-hidden='true'
                  />
                  <span>Delete</span>
                </a>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default PostMenu;
