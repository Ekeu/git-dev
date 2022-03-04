import React, { useState, useEffect } from 'react';
import { Image } from 'cloudinary-react';
import { DateTime } from 'luxon';

import Link from '../Link/Link';
import PostMenu from './PostMenu';

const Post = ({ post, loggedInUser, setServerPosts, setShowNotification }) => {
  const { _id, user, postTitle, postBody, postImgURL, createdAt, postLikes } =
    post;
  const { name, profileImageURL, username } = user;

  const [likes, setLikes] = useState(postLikes);
  const [error, setError] = useState(null);

  const isLiked =
    likes.length &&
    likes.filter((like) => like.user === loggedInUser._id).length > 0;

  return (
    <article aria-labelledby={'post-' + _id}>
      <div>
        <div className='flex space-x-3'>
          <div className='flex-shrink-0'>
            <Image
              className='h-10 w-10 rounded-full object-cover'
              cloudName='dmcookpro'
              publicId={profileImageURL}
              alt={name}
              draggable={false}
              loading='lazy'
              width={'100%'}
              height={'100%'}
            ></Image>
          </div>
          <div className='min-w-0 flex-1 font-hind'>
            <p className='text-sm font-medium text-slate-800'>
              <Link href={`/${username}`} className='hover:underline'>
                {username}
              </Link>
            </p>
            <p className='text-sm text-slate-500'>
              <Link
                href={`/${username}/posts/${_id.toString()}`}
                className='hover:underline'
              >
                {DateTime.fromISO(createdAt).toLocaleString(
                  DateTime.DATETIME_MED
                )}
              </Link>
            </p>
          </div>
          <div className='flex-shrink-0 self-center flex'>
            <PostMenu />
          </div>
        </div>
        {postTitle && (
          <h2
            id={'question-title-' + _id}
            className='mt-4 text-base font-lato font-semibold text-slate-800'
          >
            {postTitle}
          </h2>
        )}
      </div>
      <div
        className='mt-2 text-sm font-hind text-slate-700 space-y-4'
        dangerouslySetInnerHTML={{ __html: postBody }}
      />
      {postImgURL && (
        <div className='aspect-w-3 aspect-h-2 mt-2 cursor-pointer'>
          <Image
            className='object-cover shadow-sm rounded-md'
            cloudName='dmcookpro'
            publicId={postImgURL}
            alt={`Image about <<${postText}>>`}
            draggable={false}
            loading='lazy'
            width={'100%'}
            height={'100%'}
          ></Image>
        </div>
      )}
      {/* Post Actions */}
    </article>
  );
};

export default Post;
