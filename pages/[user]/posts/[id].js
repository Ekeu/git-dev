import React, { useContext, useEffect } from 'react';
import { destroyCookie, parseCookies } from 'nookies';

import Navbar from '../../../components/navbar/Navbar';
import { PostContext, UserContext } from '../../../context';
import { userService } from '../../../services/user/user';
import { setUser } from '../../../context/User/UserActions';
import PageGridLayout from '../../../components/layout/PageGridLayout';
import PageGridLeftLayout from '../../../components/layout/PageGridLeftLayout';
import PageGridCenterLayout from '../../../components/layout/PageGridCenterLayout';
import PageGridRightLayout from '../../../components/layout/PageGridRightLayout';
import { postService } from '../../../services';
import { setPost } from '../../../context/Post/PostActions';
import { Image } from 'cloudinary-react';
import Link from '../../../components/Link/Link';
import { DateTime } from 'luxon';
import PostActions from '../../../components/post/PostActions';
import Comments from '../../../components/comments-box/Comments';

const PostDetail = ({ user, error, postData }) => {
  const { dispatch: dispatchUser } = useContext(UserContext);
  const { data, dispatch: dispatchPost } = useContext(PostContext);

  const { post } = data;

  if (error) {
    console.log(error);
  }

  useEffect(() => {
    dispatchUser(setUser(user));
    dispatchPost(setPost(postData));
  }, [dispatchUser, user, dispatchPost, postData]);

  return (
    <div className='min-h-full'>
      <Navbar />
      <div className='py-10'>
        <PageGridLayout>
          <PageGridLeftLayout></PageGridLeftLayout>
          <PageGridCenterLayout>
            <div>
              <div>
                <div className='flex items-center space-x-5 border-b border-slate-300 pb-6'>
                  <div className='flex-shrink-0'>
                    <div className='relative'>
                      <Image
                        className={'h-16 w-16 rounded-full object-cover'}
                        cloudName='dmcookpro'
                        publicId={post?.user?.profileImageURL}
                        alt={post?.user?.username}
                        draggable={false}
                        width={'100%'}
                        height={'100%'}
                      />
                      <span
                        className='absolute inset-0 shadow-inner rounded-full'
                        aria-hidden='true'
                      />
                    </div>
                  </div>
                  <div>
                    {post?.postTitle ? (
                      <>
                        <h1 className='text-2xl font-bold font-inter tracking-tight text-slate-800'>
                          {post?.postTitle}
                        </h1>
                        <Link
                          href={`/${post?.user?.username}`}
                          className={'mt-2 text-sm text-slate-500 font-hind'}
                        >
                          <p className='font-medium text-slate-600'>
                            {post?.user?.name}
                          </p>
                          <p>@{post?.user?.username}</p>
                        </Link>
                      </>
                    ) : (
                      <Link href={`/${post?.user?.username}`}>
                        <h1 className='text-2xl font-bold font-inter tracking-tight text-slate-800'>
                          {post?.user?.name}
                        </h1>
                        <p className='text-sm text-slate-500 font-hind'>
                          @{post?.user?.username}
                        </p>
                      </Link>
                    )}
                  </div>
                </div>
                <div className='py-4 xl:pt-6 xl:pb-0'>
                  <div className='max-w-full space-y-2 font-hind'>
                    <p className='prose font-normal text-slate-800 text-2xl'>
                      {post?.postBody}
                    </p>
                    {post?.postImgURL && (
                      <div
                        className={`group rounded-lg overflow-hidden ${
                          post?.postImgURL && '!my-3'
                        }`}
                      >
                        <Image
                          className={'object-center object-contain'}
                          cloudName='dmcookpro'
                          publicId={post?.postImgURL}
                          alt={post?.postBody}
                          draggable={false}
                          width={'100%'}
                          height={'100%'}
                        />
                      </div>
                    )}
                    <p className='font-normal text-slate-500 text-base'>
                      {DateTime.fromISO(post?.createdAt).toLocaleString(
                        DateTime.DATETIME_MED
                      )}
                    </p>
                    <div className='border-t border-b border-slate-200 divide-y divide-slate-200'>
                      <div className='py-3 flex justify-between text-sm font-medium'>
                        <PostActions
                          user={user}
                          postLikes={post?.postLikes}
                          postClones={post?.postClones}
                          className={'!mt-0 w-full'}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <Comments />
              </div>
            </div>
          </PageGridCenterLayout>
          <PageGridRightLayout></PageGridRightLayout>
        </PageGridLayout>
      </div>
    </div>
  );
};

export default PostDetail;

export async function getServerSideProps(ctx) {
  const { u_token } = parseCookies(ctx);

  const { params } = ctx;

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
    const postData = await postService.getPostByUser(
      params.id,
      params.user,
      u_token,
      5
    );
    const { user, followers } = userData;

    return {
      props: {
        user,
        followers,
        postData,
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
