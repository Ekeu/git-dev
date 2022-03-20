import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { XCircleIcon } from '@heroicons/react/solid';

import Comment from './comment/Comment';
import Spinner from '../spinner/Spinner';
import { NotificationContext, PostContext } from '../../context';
import { errorsService, postService } from '../../services';
import { setNotification } from '../../context/Notification/NotificationActions';
import {
  setPost,
  updateComment,
  updateComments,
  deleteComment,
} from '../../context/Post/PostActions';
import Cookies from 'js-cookie';

const CommentsScroll = () => {
  const { data, dispatch: dispatchPost } = useContext(PostContext);
  const { dispatch } = useContext(NotificationContext);

  const { comments, increment, reload, update } = data || {};

  const incrementRef = useRef(increment);
  incrementRef;
  const observerRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [spinner, setSpinner] = useState(null);

  const observerHandler = useCallback(
    async (entries) => {
      console.log('OBSERVER ==> ', entries);
      const firstEntryElement = entries[0];
      if (firstEntryElement.isIntersecting) {
        try {
          const res = await postService.getPostComments(
            data?.post._id,
            incrementRef.current
          );

          console.log('OUT IF ==> ', res.comments);
          if (res.comments.length > 0) {
            console.log('IF ==> ', res.comments);
            dispatchPost(updateComments(res.comments));
          } else {
            setLoading(false);
          }
          dispatchPost(
            setPost({ increment: incrementRef.current + res.comments.length })
          );
        } catch (error) {
          setLoading(false);
          const message = errorsService.catchErrors(error);
          dispatch(
            setNotification({
              type: 'simple',
              icon: {
                Component: XCircleIcon,
                className: 'text-red-500',
              },
              headline: 'Post Error',
              message,
            })
          );
        }
      }
    },
    [data?.post._id, dispatch, dispatchPost]
  );

  useEffect(() => {
    const token = Cookies.get('u_token');
    const getPost = async () => {
      const postData = await postService.getPostByUser(
        data?.post._id,
        data?.post.user.username,
        token,
        5
      );
      dispatchPost(setPost({ ...postData, reload: false }));
    };
    if (reload) {
      try {
        setLoading(true);
        getPost();
      } catch (error) {
        setLoading(false);
        const message = errorsService.catchErrors(error);
        dispatch(
          setNotification({
            type: 'simple',
            icon: {
              Component: XCircleIcon,
              className: 'text-red-500',
            },
            headline: 'Post Error',
            message,
          })
        );
      }
    }
  }, [
    reload,
    data?.post._id,
    data?.post.user?.username,
    dispatch,
    dispatchPost,
  ]);

  useEffect(() => {
    const fetchUpdatedComment = async (commentID) => {
      const data = await postService.getUpdatedComment(commentID);
      dispatchPost(updateComment(data.comment));
    };

    const deleteCommentHandler = (commentID) => {
      dispatchPost(deleteComment(commentID));
    };

    if (update) {
      // 1 ==> update
      // 0 ==> delete
      if (update[0] === 1) {
        try {
          fetchUpdatedComment(update[1]);
        } catch (error) {
          const message = errorsService.catchErrors(error);
          dispatch(
            setNotification({
              type: 'simple',
              icon: {
                Component: XCircleIcon,
                className: 'text-red-500',
              },
              headline: 'Error',
              message,
            })
          );
        }
      } else if (update[0] === 0) {
        try {
          deleteCommentHandler(update[1]);
        } catch (error) {
          const message = errorsService.catchErrors(error);
          dispatch(
            setNotification({
              type: 'simple',
              icon: {
                Component: XCircleIcon,
                className: 'text-red-500',
              },
              headline: 'Error',
              message,
            })
          );
        }
      }
    }
  }, [update, dispatch, dispatchPost]);

  useEffect(() => {
    incrementRef.current = increment;
  }, [increment]);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(observerHandler, {
      threshold: 1,
    });
  }, [observerHandler]);

  useEffect(() => {
    const currentSpinner = spinner;
    const currentObserver = observerRef.current;

    if (currentSpinner) {
      currentObserver.observe(currentSpinner);
    }

    return () => {
      if (currentSpinner) {
        currentObserver.unobserve(currentSpinner);
      }
    };
  }, [spinner]);

  return (
    <div className='px-0 py-5'>
      {comments?.map((data) => (
        <Comment
          id={data._id}
          key={data._id}
          user={data.user}
          comment={data.comment}
          commentLikes={data.commentLikes}
          commentUnLikes={data.commentUnLikes}
          commentReplies={data.commentReplies}
        />
      ))}
      {comments?.length > 4 && loading && (
        <div
          className='w-full max-w-7xl py-5 text-center flex items-center justify-center'
          ref={setSpinner}
        >
          <Spinner className={`h-5 w-5 text-violet-500`} />
        </div>
      )}
    </div>
  );
};

export default CommentsScroll;
