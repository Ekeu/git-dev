import { useContext } from 'react';
import { DateTime } from 'luxon';
import { Image } from 'cloudinary-react';

import { UserContext } from '../../context';
import TopCommentsBox from '../comments-box/comments-box/top-comments-box/TopCommentsBox';

const PostDetail = ({ post, cancelButtonRef }) => {
  const { postTitle, postBody, createdAt } = post;

  const { user } = useContext(UserContext);
  return (
    <section aria-labelledby='activity-title' className='mt-2'>
      <div>
        <div className='divide-y divide-slate-200'>
          {postTitle && (
            <div className='pb-4'>
              <h2
                id='activity-title'
                className='text-lg font-inter font-medium tracking-tight text-slate-800'
              >
                {postTitle}
              </h2>
            </div>
          )}
          <div className='pt-6'>
            <div className='flow-root'>
              <div className='-mb-8'>
                <div className='relative pb-8'>
                  <span
                    className='absolute top-5 left-4 -ml-px h-full w-0.5 bg-gray-200'
                    aria-hidden='true'
                  />
                  <div className='relative flex items-start space-x-3'>
                    <>
                      <div className='relative'>
                        <Image
                          className='h-10 w-10 rounded-full bg-slate-400 flex items-center justify-center object-cover'
                          cloudName='dmcookpro'
                          publicId={post.user.profileImageURL}
                          alt={post.user.name}
                          draggable={false}
                          width={'100%'}
                          height={'100%'}
                        />
                      </div>
                      <div className='min-w-0 flex-1'>
                        <div>
                          <div className='text-sm'>
                            <a className='font-medium text-gray-900'>
                              {post.user.name}
                            </a>
                          </div>
                          <p className='mt-0.5 text-sm text-gray-500'>
                            Posted {DateTime.fromISO(createdAt).toRelative()}
                          </p>
                        </div>
                        <div className='mt-2 text-sm text-gray-700'>
                          <p>{postBody}</p>
                        </div>
                      </div>
                    </>
                  </div>
                </div>
              </div>
            </div>
            <div className='mt-6 z-10'>
              <TopCommentsBox user={user} cancelButtonRef={cancelButtonRef} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PostDetail;
