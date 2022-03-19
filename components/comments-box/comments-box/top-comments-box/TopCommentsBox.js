import React, { useContext, useState } from 'react';
import autosize from 'autosize';

import Form from '../../../common/form/Form';
import TextArea from '../../../common/textarea/TextArea';
import Button from '../../../common/button/Button';

import trim from '../../../../utils/trim';
import { Image } from 'cloudinary-react';
import { errorsService, postService } from '../../../../services';
import { NotificationContext, PostContext } from '../../../../context';
import { setPost } from '../../../../context/Post/PostActions';
import { setNotification } from '../../../../context/Notification/NotificationActions';
import { XCircleIcon } from '@heroicons/react/solid';

const TopCommentsBox = ({ user, cancelButtonRef }) => {
  const { profileImageURL, name } = user;

  const { data, dispatch: dispatchPost } = useContext(PostContext);
  const { dispatch } = useContext(NotificationContext);
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
    setComment('');
  };

  const resize = () => autosize(document.getElementById('comment'));

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await postService.addComment(data?.post._id, comment);
      dispatchPost(setPost({ reload: true }));
      dispatchPost(setPost({ increment: 5 }));
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
          headline: 'Comment Error',
          message,
        })
      );
    }
  };

  return (
    <div className='bg-white px-0 py-6'>
      <div className='flex space-x-3'>
        <div className='flex-shrink-0 z-10'>
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
            />
            {showButtons && (
              <div className='mt-2 flex items-center justify-end space-x-4'>
                <Button
                  onClick={onCancelComment}
                  ref={cancelButtonRef}
                  className='justify-center !border-slate-300 text-slate-700 bg-white hover:bg-slate-50 focus:!ring-0 focus:!ring-transparent'
                >
                  Cancel
                </Button>
                <Button
                  type='submit'
                  disabled={!trim(comment)}
                  className='justify-center text-white bg-violet-600 hover:bg-violet-700 disabled:bg-violet-400 relative'
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

export default TopCommentsBox;
