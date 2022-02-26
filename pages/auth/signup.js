import React, { useState, useEffect, useContext } from 'react';
import { Image } from 'cloudinary-react';
import { useForm } from 'react-hook-form';
import {
  EyeOffIcon,
  EyeIcon,
  CheckIcon,
  XCircleIcon,
} from '@heroicons/react/solid';

import Input from '../../components/common/input/input';
import Form from '../../components/common/form/form';
import AuthMessage from '../../components/auth/auth-message';
import Button from '../../components/common/button/button';
import {
  AUTH_EMAIL_CONFIG,
  AUTH_NAME_CONFIG,
  AUTH_PASSWORD_CONFIG,
  AUTH_USERNAME_CONFIG,
  SIGNUP,
  USERNAME_AVAILABLE,
} from '../../constants/auth';
import { NotificationContext } from '../../context';
import { setNotification } from '../../context/Notification/NotificationActions';
import { userService, errorsService } from '../../services';

const Signup = () => {
  const [showPassword, setShowPassord] = useState(false);
  const [enteredUsername, setEnteredsername] = useState('');
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    clearErrors,
  } = useForm({
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const { dispatch } = useContext(NotificationContext);

  const onSubmit = handleSubmit(async ({ name, username, email, password }) => {
    if (!isUsernameAvailable) return;

    try {
      setLoading(true);
      await userService.register({ name, username, email, password });
    } catch (error) {
      setLoading(false);
      const message = errorsService.catchErrors(error);
      dispatch(
        setNotification({
          type: 'simple',
          icon: {
            Component: XCircleIcon,
            className: 'text-red-400',
          },
          headline: 'Registration Error',
          message,
        })
      );
    }
  });

  const showPasswordHandler = () => setShowPassord(!showPassword);

  useEffect(() => {
    document.documentElement.classList.add('h-full', 'bg-wite');
    document.body.classList.add('h-full');

    return () => {
      document.documentElement.classList.remove('h-full', 'bg-wite');
      document.body.classList.remove('h-full');
    };
  }, []);

  useEffect(() => {
    setIsUsernameAvailable(false);
    const checkUsernameHandler = async (username) => {
      try {
        const res = await userService.checkUsername(username);
        if (res === USERNAME_AVAILABLE) {
          clearErrors('username');
          setIsUsernameAvailable(true);
        }
      } catch (error) {
        setIsUsernameAvailable(false);
        setError(
          'username',
          {
            type: 'server',
            message: error.response?.data,
          },
          {
            shouldFocus: true,
          }
        );
      }
    };

    if (errors.username?.message) return;

    let timer = setTimeout(() => {
      if (!errors.username?.message && enteredUsername)
        checkUsernameHandler(enteredUsername);
    }, 1500);

    return () => {
      clearTimeout(timer);
    };
  }, [errors.username?.message, enteredUsername, clearErrors, setError]);

  return (
    <div className='min-h-full flex relative'>
      <div
        className='absolute inset-0 bottom-0 bg-bottom bg-no-repeat bg-slate-50 bg-signup'
        style={{ backgroundSize: '150rem' }}
      ></div>
      <div className='relative flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24'>
        <div className='mx-auto w-full max-w-sm lg:w-96'>
          <div>
            <Image
              className='w-auto h-12'
              cloudName='dmcookpro'
              publicId={'git-dev/gitdev-logo.svg'}
              alt='GitDev'
              draggable={false}
              width={'100%'}
              height={'100%'}
            ></Image>
            <AuthMessage />
          </div>

          <div className='mt-8'>
            <div className='mt-0'>
              <Form onSubmit={onSubmit}>
                <Input
                  id={'name'}
                  name={'name'}
                  type={'text'}
                  label={'Name'}
                  autoComplete={'name'}
                  register={register('name', { ...AUTH_NAME_CONFIG })}
                  placeholder={'John Doe'}
                  registerErrorMessage={errors.name?.message}
                />
                <Input
                  id={'username'}
                  name={'username'}
                  type={'text'}
                  label={'Username'}
                  autoComplete={'username'}
                  register={register('username', {
                    ...AUTH_USERNAME_CONFIG,
                    onChange: (e) => setEnteredsername(e.target.value),
                  })}
                  trailingIcon={isUsernameAvailable && CheckIcon}
                  trailingIconClassName={'h-5 w-5 text-emerald-500'}
                  success={isUsernameAvailable}
                  placeholder={'iDevAbIL'}
                  inputClassName={'transition-all duration-200 ease-in-out'}
                  registerErrorMessage={errors.username?.message}
                />

                <Input
                  id={'email'}
                  name={'email'}
                  type={'email'}
                  label={'Email address'}
                  autoComplete={'email'}
                  register={register('email', { ...AUTH_EMAIL_CONFIG })}
                  placeholder={'john.doe@gmail.com'}
                  registerErrorMessage={errors.email?.message}
                />

                <Input
                  id={'password'}
                  name={'password'}
                  type={showPassword ? 'text' : 'password'}
                  label={'Password'}
                  trailingIcon={
                    showPassword ? (
                      <EyeOffIcon onClick={showPasswordHandler} />
                    ) : (
                      <EyeIcon onClick={showPasswordHandler} />
                    )
                  }
                  trailingIconClassName={'h-5 w-5 text-slate-700'}
                  inputContainerClassName={'cursor-pointer'}
                  register={register('password', { ...AUTH_PASSWORD_CONFIG })}
                  placeholder={'********'}
                  registerErrorMessage={errors.password?.message}
                />

                <div>
                  <Button
                    type='submit'
                    loading={loading}
                    disabled={!isUsernameAvailable}
                    spinnerClassName={'text-white'}
                    className='group relative !flex w-full justify-center text-white bg-violet-600 hover:bg-violet-700'
                  >
                    {SIGNUP}
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
      <div className='hidden lg:block relative w-0 flex-1'>
        <Image
          className='absolute inset-0 h-full w-full object-cover'
          cloudName='dmcookpro'
          publicId={'git-dev/auth/gitdev-signup-image'}
          loading='lazy'
          alt='Welcome Developer'
          draggable={false}
          width={'100%'}
          height={'100%'}
        ></Image>
      </div>
    </div>
  );
};

export default Signup;
