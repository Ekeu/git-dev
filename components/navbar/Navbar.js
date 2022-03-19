import { Fragment, useContext } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import {
  BellIcon,
  ChatAlt2Icon,
  ChevronDownIcon,
  MenuIcon,
  XIcon,
} from '@heroicons/react/outline';
import { CogIcon, LogoutIcon, MailIcon } from '@heroicons/react/solid';
import { Image } from 'cloudinary-react';
import { useRouter } from 'next/router';

import Search from '../search/search';
import Button from '../common/button/Button';
import MenuIconLink from './MenuIconLink';
import Link from '../Link/Link';

import { authService } from '../../services/';
import { UserContext } from '../../context';

const Navbar = () => {
  const { user } = useContext(UserContext);
  const {
    username,
    name,
    email,
    unReadMessage,
    unReadNotification,
    profileImageURL,
  } = user;

  const router = useRouter();

  const isActive = (route) => router.pathname === route;
  const isUserRoute = router.query.username === username;

  const signout = () => {
    authService.signout(email);
  };

  return (
    <Disclosure as='nav' className='bg-violet-800 shadow-sm sticky top-0 z-20'>
      {({ open }) => (
        <>
          <div className='max-w-7xl mx-auto px-2 sm:px-4 lg:px-8'>
            <div className='relative flex items-center justify-between h-16'>
              <div className='flex items-center px-2 lg:px-0'>
                <div className='flex-shrink-0'>
                  <Image
                    className='block lg:hidden h-8 w-auto'
                    cloudName='dmcookpro'
                    publicId={'git-dev/gitdev-logo-no-container.svg'}
                    alt='gitdev'
                    draggable={false}
                    width={'100%'}
                    height={'100%'}
                  ></Image>
                  <Image
                    className='hidden lg:block h-8 w-auto'
                    cloudName='dmcookpro'
                    publicId={'git-dev/gitdev-logo-with-text.svg'}
                    alt='gitdev'
                    draggable={false}
                    width={'100%'}
                    height={'100%'}
                  ></Image>
                </div>
              </div>
              <Search />
              <div className='flex lg:hidden'>
                <Disclosure.Button className='inline-flex items-center justify-center p-2 rounded-md text-slate-200 hover:text-slate-100 hover:bg-violet-700 focus:outline-none'>
                  <span className='sr-only'>Open main menu</span>
                  {open ? (
                    <XIcon className='block h-6 w-6' aria-hidden='true' />
                  ) : (
                    <MenuIcon className='block h-6 w-6' aria-hidden='true' />
                  )}
                </Disclosure.Button>
              </div>
              <div className='hidden lg:block lg:ml-4'>
                <div className='flex items-center space-x-2'>
                  <Link href={`/${username}`}>
                    <MenuIconLink
                      name={name}
                      imageURL={profileImageURL}
                      nameClassName={'text-slate-100 !font-semibold'}
                      className={`mr-4 ${
                        isUserRoute ? 'bg-violet-600' : 'hover:bg-violet-600'
                      } p-1 rounded-full`}
                    />
                  </Link>
                  <Link
                    href={'/messages'}
                    className={`relative !flex-shrink-0 bg-violet-900 !p-2 !rounded-full ${
                      isActive('/messages')
                        ? 'text-slate-100'
                        : 'text-violet-400 hover:text-slate-100'
                    } focus:!ring-0 focus:!ring-offset-0 focus:!ring-transparent`}
                  >
                    <span className='sr-only'>View Messages</span>
                    <ChatAlt2Icon className='h-6 w-6' aria-hidden='true' />
                    {unReadMessage && (
                      <span className='absolute top-0 right-0 block h-2 w-2 rounded-full ring-1 ring-white bg-amber-500' />
                    )}
                  </Link>
                  <Link
                    href={'/notifications'}
                    className={`relative !flex-shrink-0 bg-violet-900 !p-2 !rounded-full ${
                      isActive('/notifications')
                        ? 'text-slate-100'
                        : 'text-violet-400 hover:text-slate-100'
                    } focus:!ring-0 focus:!ring-offset-0 focus:!ring-transparent`}
                  >
                    <span className='sr-only'>View Notifications</span>
                    <BellIcon className='h-6 w-6' aria-hidden='true' />
                    {unReadNotification && (
                      <span className='absolute top-0 right-0 block h-2 w-2 rounded-full ring-1 ring-white bg-sky-500' />
                    )}
                  </Link>
                  <Menu as='div' className='relative flex-shrink-0'>
                    <div>
                      <Menu.Button className='bg-violet-900 p-2 rounded-full flex text-violet-400 hover:text-slate-100'>
                        <span className='sr-only'>Account</span>
                        <ChevronDownIcon
                          className='h-6 w-6'
                          aria-hidden='true'
                        />
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
                      <Menu.Items className='flex flex-col divide-y divide-slate-200 origin-top-right absolute right-0 mt-2 w-72 rounded-md shadow-lg p-2 bg-white focus:outline-none'>
                        <Menu.Item>
                          {({ active }) => (
                            <Link href={`/${username}`}>
                              <MenuIconLink
                                name={name}
                                nameClassName={
                                  'text-slate-800 !text-md !font-semibold'
                                }
                                imageURL={profileImageURL}
                                info={'See your profile'}
                                infoClassName={'!text-sm text-slate-600'}
                                className={`${
                                  active && 'bg-slate-100'
                                } block px-4 py-2 rounded-md my-2`}
                              />
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link href={'/feedback'}>
                              <MenuIconLink
                                name={'Give Feedback'}
                                nameClassName={
                                  'text-slate-800 !text-md !font-semibold'
                                }
                                Icon={MailIcon}
                                info={'Help us improve gitdev.'}
                                infoClassName={'!text-sm text-slate-600'}
                                className={`${
                                  active && 'bg-slate-100'
                                } block px-4 py-2 rounded-md my-2`}
                              />
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link href={'/settings'}>
                              <MenuIconLink
                                name={'Settings'}
                                nameClassName={
                                  'text-slate-800 !text-md !font-semibold'
                                }
                                Icon={CogIcon}
                                className={`${
                                  active && 'bg-slate-100'
                                } block px-4 py-2 rounded-md my-2`}
                              />
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item as={'button'} onClick={signout}>
                          {({ active }) => (
                            <MenuIconLink
                              name={'Sign out'}
                              nameClassName={
                                'text-slate-800 !text-md !font-semibold'
                              }
                              Icon={LogoutIcon}
                              className={`${
                                active && 'bg-slate-100'
                              } block px-4 py-2 rounded-md my-2`}
                            />
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className='lg:hidden'>
            <div className='pt-4 pb-3 border-t border-slate-300'>
              <div className='flex items-center px-5'>
                <div className='flex-shrink-0'>
                  <Image
                    className='h-10 w-10 rounded-full object-cover'
                    cloudName='dmcookpro'
                    publicId={'git-dev/emoji/4.png'}
                    alt='gitdev'
                    draggable={false}
                    width={'100%'}
                    height={'100%'}
                  ></Image>
                </div>
                <div className='ml-3'>
                  <div className='text-base font-medium text-white font-inter'>
                    {name}
                  </div>
                  <div className='text-sm font-medium text-slate-300 font-hind'>
                    {username}
                  </div>
                </div>
                <Button className='ml-auto !flex-shrink-0 bg-violet-900 !p-2 !rounded-full text-violet-400 hover:text-slate-100 focus:!ring-0 focus:!ring-offset-0 focus:!ring-transparent'>
                  <span className='sr-only'>Notifications</span>
                  <BellIcon className='h-6 w-6' aria-hidden='true' />
                </Button>
              </div>
              <div className='mt-3 px-2 space-y-1 font-inter'>
                <Disclosure.Button
                  as={Link}
                  href='/'
                  className='block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:text-slate-100 hover:bg-violet-700'
                >
                  Your Profile
                </Disclosure.Button>
                <Disclosure.Button
                  as={Link}
                  href='/'
                  className='block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:text-slate-100 hover:bg-violet-700'
                >
                  Settings
                </Disclosure.Button>
                <Button
                  onClick={signout}
                  className='block w-full !px-3 !py-2 !rounded-md !text-base text-slate-200 hover:text-slate-100 hover:bg-violet-700 focus:!ring-0 focus:!ring-offset-0 focus:!ring-transparent'
                >
                  Sign out
                </Button>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
