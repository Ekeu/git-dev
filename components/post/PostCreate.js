import React, { useContext, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { SearchIcon, UploadIcon } from '@heroicons/react/outline';
import { Image } from 'cloudinary-react';

import Button from '../common/button/Button';
import Input from '../common/input/Input';
import Form from '../common/form/Form';
import TextArea from '../common/textarea/TextArea';
import PostLocation from './PostLocation';
import PostCreateActions from './PostCreateActions';
import Modal from '../modal/Modal';
import PostCharacterCount from './PostCharacterCount';
import {
  MAX_CHAR_COUNT,
  RING_ORANGE,
  RING_RADIUS,
  RING_RED,
  RING_VIOLET,
} from '../../constants/post';
import PostMedia from './PostMedia';

import { postService } from '../../services/post/post';
import { cloudinaryServices } from '../../services/cloudinary/cloudinary';
import { NotificationContext, PostsContext } from '../../context';
import { setNotification } from '../../context/Notification/NotificationActions';
import { XCircleIcon } from '@heroicons/react/solid';
import { errorsService } from '../../services';
import { createPost } from '../../context/Posts/PostsActions';
import trim from '../../utils/trim';

let autocomplete;
let autocompleteListener;

const PostCreate = ({ user }) => {
  const { name, profileImageURL } = user;

  const inputImageRef = useRef(null);
  const { dispatch } = useContext(NotificationContext);
  const { dispatch: dispatchPost } = useContext(PostsContext);

  const [postTitle, setPostTitle] = useState('');
  const [postDescription, setPostDescription] = useState('');
  const [postLocation, setPostLocation] = useState('');
  const [location, setLocation] = useState('');

  const [numOfCharac, setNumOfChar] = useState(0);
  const [ringStyle, setRingStyle] = useState({
    stroke: '',
    strokeDasharray: '',
  });

  const [mediaFile, setMediaFile] = useState(null);
  const [mediaFilePreview, setMediaFilePreview] = useState(null);
  const cancelButtonRef = useRef(null);
  const postDescriptionRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [isImageCloseToContainer, setIsImageCloseToContainer] = useState(false);
  const [addImage, setAddImage] = useState(false);
  const [modalMounted, setModalMounted] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);
  const [openSearchModal, setOpenSearchModal] = useState(false);

  const disabled =
    (!postDescription || postDescription.length > MAX_CHAR_COUNT) &&
    mediaFile === null;

  const onEmojiChangeHandler = (e, emojiObject) => {
    const cursorPosition = postDescriptionRef.current.selectionStart;
    const newPostDescription =
      postDescription.slice(0, cursorPosition) +
      emojiObject.emoji +
      postDescription.slice(cursorPosition);
    setPostDescription(newPostDescription);
    setNumOfChar(newPostDescription.length);
  };

  const onFileChangeHandler = (e) => {
    if (e.target.files.length) {
      setMediaFile(e.target.files[0]);
      setMediaFilePreview(URL.createObjectURL(e.target.files[0]));
      setIsImageCloseToContainer(false);
    }
  };

  const onPostDescriptionChangeHandler = (e) => {
    setPostDescription(e.target.value);
    setNumOfChar(e.target.value.length);
  };

  const onPostTitleChangeHandler = (e) => {
    setPostTitle(e.target.value);
  };

  const onAddImageHandler = () => {
    setAddImage(true);
  };

  const onCloseImageHandler = () => {
    setAddImage(false);
    setMediaFile(null);
    setMediaFilePreview(null);
    setIsImageCloseToContainer(false);
  };

  const onLocationChangeHandler = (e) => {
    setLocation(e.target.value);
  };

  const showEmojisHandler = (e) => {
    setShowEmojis(!showEmojis);
  };

  const onOpenSearchModalHandler = () => {
    setOpenSearchModal(true);
  };

  const modalMountHandler = () => setModalMounted(true);

  const mondalUnmountHandler = () => {
    setLocation('');
    setModalMounted(false);
  };

  useEffect(() => {
    if (modalMounted) {
      autocomplete = new google.maps.places.Autocomplete(
        document.getElementById('autocomplete'),
        {
          fields: ['formatted_address', 'geometry', 'name', 'vicinity'],
        }
      );

      autocompleteListener = autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        setPostLocation(
          place?.vicinity || place?.name || place?.formatted_address
        );
      });
    }

    return () => {
      if (autocomplete) {
        google.maps.event.removeListener(autocompleteListener);
        google.maps.event.clearInstanceListeners(autocomplete);
        document.querySelector('.pac-container').remove();
        autocomplete = null;
      }
    };
  }, [modalMounted]);

  useEffect(() => {
    const styleRing = () => {
      const radius = RING_RADIUS;
      const circleLength = 2 * Math.PI * radius;
      const coloured = (circleLength * numOfCharac) / MAX_CHAR_COUNT;
      const slate = circleLength - coloured;

      setRingStyle((prvState) => ({
        ...prvState,
        stroke:
          MAX_CHAR_COUNT - numOfCharac <= 0
            ? RING_RED
            : MAX_CHAR_COUNT - numOfCharac <= 20
            ? RING_ORANGE
            : RING_VIOLET,
        strokeDasharray: `${coloured} ${slate}`,
      }));
    };

    styleRing();
  }, [numOfCharac, setRingStyle]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let upLoadedImage;

      if (postDescription.length > MAX_CHAR_COUNT && !mediaFile) return;

      if (mediaFile) {
        upLoadedImage = await cloudinaryServices.uploadImage(mediaFile);

        if (!upLoadedImage) {
          setLoading(false);
          dispatch(
            setNotification({
              type: 'simple',
              icon: {
                Component: XCircleIcon,
                className: 'text-red-500',
              },
              headline: 'Image upload error',
              message:
                'An error occured while uploading your image. Please try again',
            })
          );

          return;
        }
      }

      const data = await postService.createNewPost(
        postTitle,
        trim(postDescription),
        postLocation,
        upLoadedImage
      );

      dispatchPost(createPost(data));
      setPostDescription('');
      setPostTitle('');
      setPostLocation('');
      setLoading(false);
      setMediaFile(null);
      setMediaFilePreview(null);
      setAddImage(false);
      setNumOfChar(0);
      setIsImageCloseToContainer(false);
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
  };

  return (
    <>
      <div className='flex items-start space-x-3'>
        <div className='flex-shrink-0'>
          <Image
            className={'inline-block h-10 w-10 rounded-full object-cover'}
            cloudName='dmcookpro'
            publicId={profileImageURL}
            alt={name}
            draggable={false}
            width={'100%'}
            height={'100%'}
          />
        </div>
        <div className='min-w-0 flex-1'>
          <Form className='relative' onSubmit={onSubmit}>
            <div className='border border-slate-200 rounded-lg shadow-sm overflow-hidden focus-within:border-violet-400 focus-within:ring-1 focus-within:ring-violet-400'>
              <Input
                id={'title'}
                name={'title'}
                type={'text'}
                label={'Title'}
                value={postTitle}
                onChange={onPostTitleChangeHandler}
                labelClassName={'sr-only'}
                placeholder={'Post Title (Optional)'}
                inputBodyClassName={'!shadow-none'}
                inputClassName={
                  'block w-full !border-0 !pt-2.5 !text-lg font-medium focus:!ring-0 !px-4 !pb-2 !shadow-none !font-inter'
                }
              />
              <TextArea
                id={'description'}
                label={'Description'}
                labelClassName={'sr-only'}
                row={5}
                maxLength={280}
                ref={postDescriptionRef}
                value={postDescription}
                name={'description'}
                onChange={onPostDescriptionChangeHandler}
                textAreaBodyClassName={'w-full h-32'}
                textAreaClassName={
                  '!border-0 py-0 resize-none focus:!ring-0 !shadow-none px-4 w-full h-full'
                }
                placeholder={`Hello ${name.split(' ')[0]}, anything in mind?`}
              />

              {addImage && (
                <PostMedia
                  onCloseImageHandler={onCloseImageHandler}
                  onFileChangeHandler={onFileChangeHandler}
                  isImageCloseToContainer={isImageCloseToContainer}
                  setIsImageCloseToContainer={setIsImageCloseToContainer}
                  setMediaFile={setMediaFile}
                  setMediaFilePreview={setMediaFilePreview}
                  mediaFile={mediaFile}
                  ref={inputImageRef}
                  mediaFilePreview={mediaFilePreview}
                />
              )}

              <div aria-hidden='true'>
                {(addImage || postLocation) && (
                  <div className='py-2'>
                    <div className='h-9' />
                  </div>
                )}
                <div className='h-px' />
                <div className='py-2'>
                  <div className='py-px'>
                    <div className='h-9' />
                  </div>
                </div>
              </div>
            </div>

            <div className='absolute bottom-0 inset-x-px'>
              {postLocation && (
                <PostLocation
                  location={postLocation}
                  openSearchModal={onOpenSearchModalHandler}
                />
              )}
              <div className='border-t border-slate-200 pl-2 pr-4 py-2 flex justify-between items-center space-x-3 sm:pl-3 sm:pr-5'>
                <PostCreateActions
                  postCreateEmojiHandler={onEmojiChangeHandler}
                  postCreateLocationHandler={onOpenSearchModalHandler}
                  postCreateImageHandler={onAddImageHandler}
                  showEmojisHandler={showEmojisHandler}
                  showEmojis={showEmojis}
                />
                <div className='flex'>
                  <PostCharacterCount
                    style={ringStyle}
                    numOfCharac={numOfCharac}
                  />
                  <span className='ml-2 pl-3 border-l border-slate-300'>
                    <Button
                      type='submit'
                      disabled={disabled || trim(postDescription).length <= 0}
                      className='text-white relative disabled:bg-violet-400 bg-violet-600 hover:bg-violet-700 font-semibold !rounded-full focus:!ring-0 focus:!ring-offset-0 focus:!ring-transparent'
                    >
                      Add Post
                    </Button>
                  </span>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </div>
      <Modal
        openModal={openSearchModal}
        modalMountHandler={modalMountHandler}
        mondalUnmountHandler={mondalUnmountHandler}
        setOpenModal={setOpenSearchModal}
        cancelButtonRef={cancelButtonRef}
        className={'sm:w-full'}
        center
      >
        <Input
          id={'autocomplete'}
          name={'street'}
          type={'text'}
          value={location}
          leadingIconClassName={'h-5 w-5 text-slate-400'}
          leadingIcon={SearchIcon}
          onChange={onLocationChangeHandler}
          placeholder={'Search locations'}
          inputBodyClassName={'!shadow-none'}
          inputClassName={'w-full h-12 !border-0 focus:!ring-0 !shadow-none'}
        />
      </Modal>
    </>
  );
};

export default PostCreate;
ReactDOM;
