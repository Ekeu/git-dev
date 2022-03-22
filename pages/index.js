import { Fragment, useContext, useEffect } from 'react';
import { parseCookies, destroyCookie } from 'nookies';

import { userService } from '../services/user/user';
import Navbar from '../components/navbar/Navbar';
import { postService } from '../services';
import Post from '../components/post/Post';
import PostCreate from '../components/post/PostCreate';
import { PostsContext, UserContext } from '../context';
import { setPosts } from '../context/Posts/PostsActions';
import { setUser } from '../context/User/UserActions';
import PageGridLayout from '../components/layout/PageGridLayout';
import PageGridLeftLayout from '../components/layout/PageGridLeftLayout';
import PageGridCenterLayout from '../components/layout/PageGridCenterLayout';
import PageGridRightLayout from '../components/layout/PageGridRightLayout';

export default function Home({ user, postsData, error }) {
  const { posts, dispatch: dispatchPost } = useContext(PostsContext);
  const { dispatch: dispatchUser } = useContext(UserContext);

  if (error) {
    console.log(error);
  }

  useEffect(() => {
    const newPosts = postsData.map((post) => {
      if (post?.clone) {
        const { cloneData, ...restPost } = post;
        const { user, ...restCloneData } = cloneData;

        return {
          ...restPost,
          ...restCloneData,
          author: user,
          clone: post?.clone,
          clonedBy: post?.user?.username,
        };
      }

      return post;
    });
    dispatchPost(setPosts(newPosts));
    dispatchUser(setUser(user));
  }, [dispatchPost, dispatchUser, postsData, user]);

  return (
    <Fragment>
      <div className='min-h-full'>
        <Navbar />
        <div className='py-10'>
          <PageGridLayout>
            <PageGridLeftLayout></PageGridLeftLayout>
            <PageGridCenterLayout>
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
            </PageGridCenterLayout>
            <PageGridRightLayout></PageGridRightLayout>
          </PageGridLayout>
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
          message: error.message ? error.message : error,
        },
      },
    };
  }
}
