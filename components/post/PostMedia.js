import { XIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import React, { forwardRef } from 'react';
import AddImge from '../icons/AddImge';

const PostMedia = forwardRef(
  (
    {
      mediaFile,
      setMediaFile,
      mediaFilePreview,
      onFileChangeHandler,
      setMediaFilePreview,
      onCloseImageHandler,
      isImageCloseToContainer,
      setIsImageCloseToContainer,
    },
    ref
  ) => {
    const onInputFileChange = () => {
      ref.current.click();
    };

    const onDragOverFileHandler = (e) => {
      e.preventDefault();
      setIsImageCloseToContainer(true);
    };

    const onDragLeaveFileHandler = (e) => {
      e.preventDefault();
      setIsImageCloseToContainer(false);
    };

    const onDropFileHandler = (e) => {
      e.preventDefault();
      setIsImageCloseToContainer(true);

      const droppedFile = Array.from(e.dataTransfer.files);
      setMediaFile(droppedFile[0]);
      setMediaFilePreview(URL.createObjectURL(droppedFile[0]));
    };

    return (
      <div
        className={`mx-4 p-2 border-2 ${
          isImageCloseToContainer ? 'border-green-400' : 'border-slate-200'
        } ${mediaFile ? 'h-fit' : 'h-60'} rounded-md font-hind`}
        onDragOver={onDragOverFileHandler}
        onDragLeave={onDragLeaveFileHandler}
        onDrop={onDropFileHandler}
      >
        <div className='relative flex justify-center w-full h-full rounded-md items-center bg-slate-200'>
          <div className='absolute top-0 right-0 pt-4 pr-4 z-10'>
            <div
              role={'button'}
              onClick={onCloseImageHandler}
              className='bg-slate-500 rounded-full p-1 text-slate-200 hover:bg-slate-400'
            >
              <XIcon className='h-5 w-5' aria-hidden='true' />
            </div>
          </div>

          {mediaFile && (
            <div className='relative w-full h-full image-container'>
              <Image
                className={'shadow-lg rounded-md cursor-pointer image'}
                layout={'fill'}
                src={mediaFilePreview}
                objectFit={'cover'}
                alt={'File to upload'}
                draggable={false}
                onClick={onInputFileChange}
              />
            </div>
          )}
          <div
            className={`space-y-1 text-center ${
              mediaFile ? 'hidden' : 'block'
            }`}
          >
            <AddImge className={'mx-auto h-12 w-12 text-slate-500'} />
            <div className='flex text-sm text-slate-700'>
              <label
                htmlFor='media-file-upload'
                className='relative cursor-pointer rounded-md font-medium text-violet-600 hover:text-violet-700'
              >
                <span>Upload a file</span>
                <input
                  ref={ref}
                  id='media-file-upload'
                  name='media-file-upload'
                  type='file'
                  onChange={onFileChangeHandler}
                  accept='.png, .jpg, .jpeg, .gif'
                  className='sr-only'
                />
              </label>
              <p className='pl-1'>or drag and drop</p>
            </div>
            <p className='text-xs text-slate-600'>PNG, JPG, GIF</p>
          </div>
        </div>
      </div>
    );
  }
);

PostMedia.displayName = 'PostMedia';
export default PostMedia;
