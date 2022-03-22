import React, { useState, useRef, useContext, useEffect } from 'react';
import { Image } from 'cloudinary-react';
import { DateTime } from 'luxon';

import Link from '../Link/Link';
import PostMenu from './PostMenu';
import PostActions from './PostActions';
import Modal from '../modal/Modal';
import PostDelete from './PostDelete';
import { errorsService, postService } from '../../services';
import { NotificationContext, PostsContext, UserContext } from '../../context';
import { setNotification } from '../../context/Notification/NotificationActions';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/solid';
import {
  createPost,
  deletePost,
  updatePostClones,
  updatePostLikes,
} from '../../context/Posts/PostsActions';
import {
  updatePostsCloned,
  updatePostsLiked,
} from '../../context/User/UserActions';
import RetweetIcon from '../icons/RetweetIcon';
import PostReply from './PostReply';

const Post = ({ post, loggedInUser }) => {
  const { dispatch } = useContext(NotificationContext);
  const { dispatch: dispatchPost } = useContext(PostsContext);
  const { dispatch: dispatchUser } = useContext(UserContext);

  const cancelButtonRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openPostModal, setOpenPostModal] = useState(false);

  const {
    _id = '',
    postTitle = '',
    postBody = '',
    postImgURL = '',
    createdAt = '',
    clonedBy = null,
    clone = false,
    user = null,
    author = null,
    postLikes = [],
    postClones = [],
    postLocation = '',
  } = post || {};

  const { name, profileImageURL, username } = author || user;

  //console.log(postData);

  const onOpenModalHandler = () => {
    setOpenModal(true);
  };

  const onOpenReplyPostHandler = () => {
    setOpenPostModal(true);
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
            className: 'text-red-500',
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
      dispatchPost(updatePostLikes(data.postLikes, _id, clone));
      dispatchUser(updatePostsLiked(data.postsLiked));
    } catch (error) {
      const message = errorsService.catchErrors(error);
      dispatch(
        setNotification({
          type: 'simple',
          icon: {
            Component: XCircleIcon,
            className: 'text-red-500',
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
        const { cloneData, ...restPost } = data.clonedPost;
        const { user, ...restCloneData } = cloneData;

        const newPost = {
          ...restPost,
          ...restCloneData,
          author: user,
          clone: data.clonedPost?.clone,
          clonedBy: data.clonedPost?.user?.username,
        };
        dispatchPost(createPost(newPost));
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
            className: 'text-red-500',
          },
          headline: 'Clone Error',
          message,
        })
      );
    }
  };

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
              />
            </div>
            <div className='min-w-0 flex-1 font-hind'>
              {clone && (
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
          <div className='w-full mt-2'>
            <Image
              className='object-center object-contain shadow-sm rounded-md'
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
          onOpenReplyPostHandler={onOpenReplyPostHandler}
          onClonePostHandler={onClonePostHandler}
          user={loggedInUser}
        />
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

      <Modal
        openModal={openPostModal}
        setOpenModal={setOpenPostModal}
        cancelButtonRef={cancelButtonRef}
        className={'sm:p-6 sm:w-full'}
        center
      >
        <PostReply post={post} cancelButtonRef={cancelButtonRef} />
      </Modal>
    </>
  );
};

export default Post;
