import { Dialog } from '@headlessui/react';
import React from 'react';
import {
  DELETE_POST_HEADLINE,
  DELETE_POST_MESSAGE,
} from '../../constants/post';
import Button from '../common/button/Button';

const PostDelete = ({
  loading,
  cancelButtonRef,
  onDeletePostHandler,
  onCancelDeletePostHandler,
}) => {
  return (
    <>
      <div>
        <div className='mt-3 text-left sm:mt-5'>
          <Dialog.Title
            as='h3'
            className='text-lg leading-6 font-inter tracking-tight font-medium text-slate-800'
          >
            {DELETE_POST_HEADLINE}
          </Dialog.Title>
          <div className='mt-2'>
            <p className='text-sm text-slate-500 font-hind'>
              {DELETE_POST_MESSAGE}
            </p>
          </div>
        </div>
      </div>
      <div className='mt-5 sm:mt-6 space-y-2'>
        <Button
          loading={loading}
          spinnerClassName={'text-white'}
          className='justify-center w-full bg-red-500 text-white hover:bg-red-600 focus:!ring-0 focus:!ring-offset-0'
          onClick={onDeletePostHandler}
        >
          Delete
        </Button>
        <Button
          ref={cancelButtonRef}
          className='justify-center w-full !border-slate-300 bg-white text-slate-600 hover:bg-slate-50 focus:!ring-0 focus:!ring-offset-0'
          onClick={onCancelDeletePostHandler}
        >
          Cancel
        </Button>
      </div>
    </>
  );
};

export default PostDelete;
