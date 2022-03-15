import { Fragment, useContext, useEffect } from 'react';
import { parseCookies, destroyCookie } from 'nookies';

import { userService } from '../services/user/user';
import Navbar from '../components/navbar/Navbar';
import { postService } from '../services';
import Post from '../components/post/Post';
import PostCreate from '../components/post/PostCreate';
import { PostContext, UserContext } from '../context';
import { setPosts } from '../context/Post/PostActions';
import { setUser } from '../context/User/UserActions';

export default function Home({ user, postsData, error }) {
  const { posts, dispatch: dispatchPost } = useContext(PostContext);
  const { dispatch: dispatchUser } = useContext(UserContext);

  if (error) {
    console.log(error);
  }

  useEffect(() => {
    dispatchPost(setPosts(postsData));
    dispatchUser(setUser(user));
  }, [dispatchPost, dispatchUser, postsData, user]);

  return (
    <Fragment>
      <div className='min-h-full'>
        <Navbar user={user} />

        <div className='py-10'>
          <div className='max-w-3xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8'>
            <div className='hidden lg:block lg:col-span-3 xl:col-span-3'>
              <nav
                aria-label='Sidebar'
                className='sticky top-28 divide-y divide-slate-300'
              ></nav>
            </div>
            <main className='lg:col-span-9 xl:col-span-6 mt-2'>
              <div className='px-4 sm:px-0'>
                <PostCreate user={user} />
              </div>
              <div className='mt-4'>
                <ul role='list' className='space-y-4'>
                  {posts.map((post) => (
                    <li
                      key={post._id}
                      className='bg-white px-4 py-6 shadow sm:p-6 sm:rounded-lg'
                    >
                      <Post post={post} loggedInUser={user} />
                    </li>
                  ))}
                </ul>
              </div>
            </main>
            <aside className='hidden xl:block xl:col-span-3'>
              <div className='sticky top-28 space-y-4'></div>
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
    const postsData = await postService.fetchPostsFromServer(u_token);
    const { user, followers } = userData;

    return {
      props: {
        user,
        followers,
        postsData,
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
