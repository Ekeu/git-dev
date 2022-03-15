import React, { useState, useRef, useContext, useEffect } from 'react';
import { Image } from 'cloudinary-react';
import { DateTime } from 'luxon';

import Link from '../Link/Link';
import PostMenu from './PostMenu';
import PostActions from './PostActions';
import Modal from '../modal/Modal';
import PostDelete from './PostDelete';
import { errorsService, postService } from '../../services';
import { NotificationContext, PostContext, UserContext } from '../../context';
import { setNotification } from '../../context/Notification/NotificationActions';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/solid';
import {
  createPost,
  deletePost,
  updatePostClones,
  updatePostLikes,
} from '../../context/Post/PostActions';
import {
  updatePostsCloned,
  updatePostsLiked,
} from '../../context/User/UserActions';
import RetweetIcon from '../icons/RetweetIcon';
import Comments from '../comments/Comments';

const Post = ({ post, loggedInUser }) => {
  const { dispatch } = useContext(NotificationContext);
  const { dispatch: dispatchPost } = useContext(PostContext);
  const { dispatch: dispatchUser } = useContext(UserContext);

  const cancelButtonRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [isClone, setIsClone] = useState(false);
  const [clonedBy, setClonedBy] = useState(null);
  const [postData, setPostData] = useState(null);

  const {
    _id = '',
    user = {},
    postTitle = '',
    postBody = '',
    postImgURL = '',
    createdAt = '',
    postLikes = [],
    postClones = [],
    postLocation = '',
  } = postData || {};

  const { name, profileImageURL, username } = user;

  const onOpenModalHandler = () => {
    setOpenModal(true);
  };

  const onCancelDeletePostHandler = () => {
    setOpenModal(false);
  };

  const onDeletePostHandler = async () => {
    setLoading(true);

    try {
      const data = await postService.deletePost(_id);
      dispatchPost(deletePost(_id));
      setLoading(false);
      setOpenModal(false);
      dispatch(
        setNotification({
          type: 'simple',
          icon: {
            Component: CheckCircleIcon,
            className: 'text-green-400',
          },
          headline: 'Delete Success',
          message: data,
        })
      );
    } catch (error) {
      setLoading(false);
      setOpenModal(false);
      const message = errorsService.catchErrors(error);
      dispatch(
        setNotification({
          type: 'simple',
          icon: {
            Component: XCircleIcon,
            className: 'text-red-400',
          },
          headline: 'Delete Error',
          message,
        })
      );
    }
  };

  const onLikePostHandler = async () => {
    try {
      const data = await postService.likePost(_id);
      dispatchPost(updatePostLikes(data.postLikes, _id));
      dispatchUser(updatePostsLiked(data.postsLiked));
    } catch (error) {
      const message = errorsService.catchErrors(error);
      dispatch(
        setNotification({
          type: 'simple',
          icon: {
            Component: XCircleIcon,
            className: 'text-red-400',
          },
          headline: 'Like Error',
          message,
        })
      );
    }
  };

  const onClonePostHandler = async () => {
    try {
      const data = await postService.clonePost(_id);

      if (data.unclone) {
        dispatchPost(deletePost(data.cloneID));
        dispatchPost(updatePostClones(data.postClones, _id));
        dispatchUser(updatePostsCloned(data.postsCloned));
      } else {
        console.log('CLONE ', data.clonedPost);
        dispatchPost(createPost(data.clonedPost));
        dispatchPost(updatePostClones(data.postClones, _id));
        dispatchUser(updatePostsCloned(data.postsCloned));
      }
    } catch (error) {
      const message = errorsService.catchErrors(error);
      dispatch(
        setNotification({
          type: 'simple',
          icon: {
            Component: XCircleIcon,
            className: 'text-red-400',
          },
          headline: 'Clone Error',
          message,
        })
      );
    }
  };

  useEffect(() => {
    const postIsCloned = post?.cloneData !== undefined;
    const postWasClonedBy = postIsCloned ? post?.user.username : null;
    const data = postIsCloned
      ? {
          ...post.cloneData,
          user: post.user,
        }
      : post;
    setIsClone(postIsCloned);
    setClonedBy(postWasClonedBy);
    setPostData(data);
  }, [post]);

  return (
    <>
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
              {isClone && (
                <div className='flex'>
                  <RetweetIcon className={'h-4 w-4 fill-slate-600'} />
                  <p className='text-sm font-medium text-gray-600 block ml-2'>
                    {clonedBy === loggedInUser?.username
                      ? 'You Cloned'
                      : `${clonedBy} Cloned`}
                  </p>
                </div>
              )}
              <div className='flex'>
                <p className='text-sm font-medium text-slate-800'>
                  <Link href={`/${username}`} className='hover:underline'>
                    {name}
                  </Link>
                </p>
                <p className='text-sm font-normal text-slate-500 ml-1'>
                  @{username}
                </p>
              </div>
              <div className='flex'>
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
                {postLocation && (
                  <p className='text-sm font-normal text-violet-700 ml-3 border-l border-slate-300 pl-3'>
                    {postLocation}
                  </p>
                )}
              </div>
            </div>
            <div className='flex-shrink-0 self-center flex'>
              <PostMenu
                post={post}
                user={loggedInUser}
                onOpenModalHandler={onOpenModalHandler}
              />
            </div>
          </div>
          {postTitle && (
            <h2
              id={'question-title-' + _id}
              className='mt-4 text-lg font-inter tracking-tight font-semibold text-slate-800'
            >
              {postTitle}
            </h2>
          )}
        </div>
        <div
          className='mt-2 text-base font-hind text-slate-700 space-y-4 whitespace-pre-wrap'
          dangerouslySetInnerHTML={{ __html: postBody }}
        />
        {postImgURL && (
          <div className='w-full aspect-w-1 aspect-h-1 mt-2'>
            <Image
              className='object-cover shadow-sm rounded-md'
              cloudName='dmcookpro'
              publicId={postImgURL}
              alt={`Image about <<${postBody}>>`}
              draggable={false}
              loading='lazy'
              width={'100%'}
              height={'100%'}
            ></Image>
          </div>
        )}
        <PostActions
          postLikes={postLikes}
          postClones={postClones}
          onLikePostHandler={onLikePostHandler}
          onClonePostHandler={onClonePostHandler}
          user={loggedInUser}
        />

        <Comments currentUserId={user?._id} />
      </article>

      <Modal
        openModal={openModal}
        setOpenModal={setOpenModal}
        cancelButtonRef={cancelButtonRef}
        className={'sm:p-6 sm:w-[390px]'}
        center
      >
        <PostDelete
          loading={loading}
          cancelButtonRef={cancelButtonRef}
          onDeletePostHandler={onDeletePostHandler}
          onCancelDeletePostHandler={onCancelDeletePostHandler}
        />
      </Modal>
    </>
  );
};

export default Post;
