import React, { useContext, useState } from 'react';
import autosize from 'autosize';

import Form from '../../common/form/Form';
import TextArea from '../../common/textarea/TextArea';
import Button from '../../common/button/Button';

import trim from '../../../utils/trim';

import { useOpenReply } from '../comment/Comment';
import { Image } from 'cloudinary-react';
import {
  NotificationContext,
  PostContext,
  UserContext,
} from '../../../context';
import { errorsService, postService } from '../../../services';
import { setNotification } from '../../../context/Notification/NotificationActions';
import { XCircleIcon } from '@heroicons/react/solid';
import { setPost } from '../../../context/Post/PostActions';

const CommentsBox = (props) => {
  const onReplyCommentHandler = useOpenReply();

  const { parentid } = props;

  const { user } = useContext(UserContext);
  const { data, dispatch: dispatchPost } = useContext(PostContext);
  const { dispatch } = useContext(NotificationContext);
  const { profileImageURL, name } = user;

  const [comment, setComment] = useState('');
  const [showButtons, setShowButtons] = useState(false);
  const [loading, setLoading] = useState(false);

  const onCommentFocus = () => {
    setShowButtons(true);
  };

  const onCommentChange = (e) => {
    resize();
    setComment(e.target.value);
  };

  const onCancelComment = () => {
    setShowButtons(false);
    onReplyCommentHandler();
  };

  const resize = () => autosize(document.getElementById('comment'));

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await postService.addReply(data?.post._id, parentid, comment);
      dispatchPost(setPost({ update: [1, parentid] }));
      setLoading(false);
      setComment('');
      setShowButtons(false);
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
          headline: 'Reply Error',
          message,
        })
      );
    }
  };

  return (
    <div className='bg-white px-0 py-6'>
      <div className='flex space-x-3'>
        <div className='flex-shrink-0'>
          <Image
            className='h-8 w-8 rounded-full object-cover'
            cloudName='dmcookpro'
            publicId={profileImageURL}
            alt={name}
            draggable={false}
            loading='lazy'
          />
        </div>
        <div className='min-w-0 flex-1'>
          <Form onSubmit={onSubmit}>
            <TextArea
              id={'comment'}
              label={'Add Comment'}
              labelClassName={'sr-only'}
              row={2}
              value={comment}
              onFocus={onCommentFocus}
              onChange={onCommentChange}
              textAreaBodyClassName={'w-full !mt-0'}
              textAreaClassName={'!shadow-none sm:!text-sm resize-none'}
              placeholder={`Write a comment...`}
              {...props}
            />
            {showButtons && (
              <div className='mt-2 flex items-center justify-end space-x-4'>
                <Button
                  onClick={onCancelComment}
                  className='justify-center !border-slate-300 text-slate-700 bg-white hover:bg-slate-50 focus:!ring-0 focus:!ring-transparent'
                >
                  Cancel
                </Button>
                <Button
                  type='submit'
                  disabled={!trim(comment)}
                  className='justify-center text-white bg-violet-600 hover:bg-violet-700 disabled:bg-violet-400'
                >
                  Comment
                </Button>
              </div>
            )}
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CommentsBox;
