import { Fragment, useEffect, useState } from 'react';
import { parseCookies, destroyCookie } from 'nookies';
import { ChatAltIcon, PlusSmIcon } from '@heroicons/react/solid';
import {
  FireIcon,
  HomeIcon,
  TrendingUpIcon,
  UserGroupIcon,
} from '@heroicons/react/outline';

const user = {
  name: 'Chelsea Hagon',
  email: 'chelseahagon@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};
const navigation = [
  { name: 'Home', href: '#', icon: HomeIcon, current: true },
  { name: 'Popular', href: '#', icon: FireIcon, current: false },
  { name: 'Communities', href: '#', icon: UserGroupIcon, current: false },
  { name: 'Trending', href: '#', icon: TrendingUpIcon, current: false },
];
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
];
const communities = [
  { name: 'Movies', href: '#' },
  { name: 'Food', href: '#' },
  { name: 'Sports', href: '#' },
  { name: 'Animals', href: '#' },
  { name: 'Science', href: '#' },
  { name: 'Dinosaurs', href: '#' },
  { name: 'Talents', href: '#' },
  { name: 'Gaming', href: '#' },
];
const tabs = [
  { name: 'Recent', href: '#', current: true },
  { name: 'Most Liked', href: '#', current: false },
  { name: 'Most Answers', href: '#', current: false },
];

const whoToFollow = [
  {
    name: 'Leonard Krasner',
    handle: 'leonardkrasner',
    href: '#',
    imageUrl:
      'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  // More people...
];
const trendingPosts = [
  {
    id: 1,
    user: {
      name: 'Floyd Miles',
      imageUrl:
        'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    body: 'What books do you have on your bookshelf just to look smarter than you actually are?',
    comments: 291,
  },
  // More posts...
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

import { userService } from '../services/user/user';
import Navbar from '../components/navbar/Navbar';
import { postService } from '../services';
import Post from '../components/post/Post';

export default function Home({ user, posts }) {
  const [serverPosts, setServerPosts] = useState(posts);
  const [showNotification, setShowNotification] = useState(false);
  useEffect(() => {}, []);
  return (
    <Fragment>
      <div className='min-h-full'>
        {/* When the mobile menu is open, add `overflow-hidden` to the `body` element to prevent double scrollbars */}
        <Navbar user={user} />

        <div className='py-10'>
          <div className='max-w-3xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8'>
            <div className='hidden lg:block lg:col-span-3 xl:col-span-2'>
              <nav
                aria-label='Sidebar'
                className='sticky top-28 divide-y divide-gray-300'
              >
                <div className='pb-8 space-y-1'>
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current
                          ? 'bg-gray-200 text-gray-900'
                          : 'text-gray-600 hover:bg-gray-50',
                        'group flex items-center px-3 py-2 text-sm font-medium rounded-md'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      <item.icon
                        className={classNames(
                          item.current
                            ? 'text-gray-500'
                            : 'text-gray-400 group-hover:text-gray-500',
                          'flex-shrink-0 -ml-1 mr-3 h-6 w-6'
                        )}
                        aria-hidden='true'
                      />
                      <span className='truncate block'>{item.name}</span>
                      <span className='truncate block'>Name</span>
                    </a>
                  ))}
                </div>
                <div className='pt-10'>
                  <p
                    className='px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider'
                    id='communities-headline'
                  >
                    My communities
                  </p>
                  <div
                    className='mt-3 space-y-2'
                    aria-labelledby='communities-headline'
                  >
                    {communities.map((community) => (
                      <a
                        key={community.name}
                        href={community.href}
                        className='group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50'
                      >
                        <span className='truncate'>{community.name}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </nav>
            </div>
            <main className='lg:col-span-9 xl:col-span-6 mt-2'>
              <div className='px-4 sm:px-0'>
                <div className='sm:hidden'>
                  <label htmlFor='question-tabs' className='sr-only'>
                    Select a tab
                  </label>
                  <select
                    id='question-tabs'
                    className='block w-full rounded-md border-gray-300 text-base font-medium text-gray-900 shadow-sm focus:border-rose-500 focus:ring-rose-500'
                    defaultValue={tabs.find((tab) => tab.current).name}
                  >
                    {tabs.map((tab) => (
                      <option key={tab.name}>{tab.name}</option>
                    ))}
                  </select>
                </div>
                <div className='hidden sm:block'>
                  <nav
                    className='relative z-0 rounded-lg shadow flex divide-x divide-gray-200'
                    aria-label='Tabs'
                  >
                    {tabs.map((tab, tabIdx) => (
                      <a
                        key={tab.name}
                        href={tab.href}
                        aria-current={tab.current ? 'page' : undefined}
                        className={classNames(
                          tab.current
                            ? 'text-gray-900'
                            : 'text-gray-500 hover:text-gray-700',
                          tabIdx === 0 ? 'rounded-l-lg' : '',
                          tabIdx === tabs.length - 1 ? 'rounded-r-lg' : '',
                          'group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-6 text-sm font-medium text-center hover:bg-gray-50 focus:z-10'
                        )}
                      >
                        <span>{tab.name}</span>
                        <span
                          aria-hidden='true'
                          className={classNames(
                            tab.current ? 'bg-rose-500' : 'bg-transparent',
                            'absolute inset-x-0 bottom-0 h-0.5'
                          )}
                        />
                      </a>
                    ))}
                  </nav>
                </div>
              </div>
              <div className='mt-4'>
                <h1 className='sr-only'>Recent questions</h1>
                <ul role='list' className='space-y-4'>
                  {serverPosts.map((post) => (
                    <li
                      key={post._id}
                      className='bg-white px-4 py-6 shadow sm:p-6 sm:rounded-lg'
                    >
                      <Post
                        post={post}
                        loggedInUser={user}
                        setServerPosts={setServerPosts}
                        setShowNotification={setShowNotification}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </main>
            <aside className='hidden xl:block xl:col-span-4'>
              <div className='sticky top-28 space-y-4'>
                <section aria-labelledby='who-to-follow-heading'>
                  <div className='bg-white rounded-lg shadow'>
                    <div className='p-6'>
                      <h2
                        id='who-to-follow-heading'
                        className='text-base font-medium text-gray-900'
                      >
                        Who to follow
                      </h2>
                      <div className='mt-6 flow-root'>
                        <ul
                          role='list'
                          className='-my-4 divide-y divide-gray-200'
                        >
                          {whoToFollow.map((user) => (
                            <li
                              key={user.handle}
                              className='flex items-center py-4 space-x-3'
                            >
                              <div className='flex-shrink-0'>
                                <img
                                  className='h-8 w-8 rounded-full'
                                  src={user.imageUrl}
                                  alt=''
                                />
                              </div>
                              <div className='min-w-0 flex-1'>
                                <p className='text-sm font-medium text-gray-900'>
                                  <a href={user.href}>{user.name}</a>
                                </p>
                                <p className='text-sm text-gray-500'>
                                  <a href={user.href}>{'@' + user.handle}</a>
                                </p>
                              </div>
                              <div className='flex-shrink-0'>
                                <button
                                  type='button'
                                  className='inline-flex items-center px-3 py-0.5 rounded-full bg-rose-50 text-sm font-medium text-rose-700 hover:bg-rose-100'
                                >
                                  <PlusSmIcon
                                    className='-ml-1 mr-0.5 h-5 w-5 text-rose-400'
                                    aria-hidden='true'
                                  />
                                  <span>Follow</span>
                                </button>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className='mt-6'>
                        <a
                          href='#'
                          className='w-full block text-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50'
                        >
                          View all
                        </a>
                      </div>
                    </div>
                  </div>
                </section>
                <section aria-labelledby='trending-heading'>
                  <div className='bg-white rounded-lg shadow'>
                    <div className='p-6'>
                      <h2
                        id='trending-heading'
                        className='text-base font-medium text-gray-900'
                      >
                        Trending
                      </h2>
                      <div className='mt-6 flow-root'>
                        <ul
                          role='list'
                          className='-my-4 divide-y divide-gray-200'
                        >
                          {trendingPosts.map((post) => (
                            <li key={post.id} className='flex py-4 space-x-3'>
                              <div className='flex-shrink-0'>
                                <img
                                  className='h-8 w-8 rounded-full'
                                  src={post.user.imageUrl}
                                  alt={post.user.name}
                                />
                              </div>
                              <div className='min-w-0 flex-1'>
                                <p className='text-sm text-gray-800'>
                                  {post.body}
                                </p>
                                <div className='mt-2 flex'>
                                  <span className='inline-flex items-center text-sm'>
                                    <button
                                      type='button'
                                      className='inline-flex space-x-2 text-gray-400 hover:text-gray-500'
                                    >
                                      <ChatAltIcon
                                        className='h-5 w-5'
                                        aria-hidden='true'
                                      />
                                      <span className='font-medium text-gray-900'>
                                        {post.comments}
                                      </span>
                                    </button>
                                  </span>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className='mt-6'>
                        <a
                          href='#'
                          className='w-full block text-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50'
                        >
                          View all
                        </a>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export async function getServerSideProps(ctx) {
  const { u_token } = parseCookies(ctx);

  if (!u_token) {
    destroyCookie(ctx, 'u_token');
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    };
  }

  try {
    const userData = await userService.fetchUserFromServer(u_token);
    const postData = await postService.fetchPostsFromServer(u_token);
    const { user, followers } = userData;

    return {
      props: {
        user,
        followers,
        posts: postData,
      },
    };
  } catch (error) {
    return {
      props: {
        error: {
          message: error.message,
        },
      },
    };
  }
}
