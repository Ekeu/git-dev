import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { EyeOffIcon, EyeIcon, XCircleIcon } from '@heroicons/react/solid';
import { Image } from 'cloudinary-react';
import { useForm } from 'react-hook-form';
import { parseCookies } from 'nookies';

import Form from '../../components/common/form/Form';
import AuthMessage from '../../components/auth/AuthMessage';
import { AUTH_EMAIL_CONFIG, SIGNIN } from '../../constants/auth';
import Input from '../../components/common/input/Input';
import Button from '../../components/common/button/Button';
import Link from 'next/link';
import { NotificationContext } from '../../context';
import { authService, errorsService } from '../../services';
import { setNotification } from '../../context/Notification/NotificationActions';
import Cookies from 'js-cookie';

const Signin = () => {
  const [showPassword, setShowPassord] = useState(false);
  const [loading, setLoading] = useState(false);

  const showPasswordHandler = () => setShowPassord(!showPassword);

  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { dispatch } = useContext(NotificationContext);

  const onSubmit = handleSubmit(async ({ email, password }) => {
    setLoading(true);
    try {
      await authService.login({ email, password });
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
          headline: 'Login Error',
          message,
        })
      );
    }
  });

  useEffect(() => {
    document.documentElement.classList.add('h-full');
    document.body.classList.add('h-full');

    return () => {
      document.documentElement.classList.remove('h-full');
      document.body.classList.remove('h-full');
    };
  }, []);

  useEffect(() => {
    const u_email = Cookies.get('u_email');
    if (u_email) {
      setValue('email', u_email);
    }
  }, [setValue]);

  return (
    <>
      <div className='relative min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-violet-500/40 to-white'>
        <div className='relative max-w-md w-full space-y-8'>
          <div>
            <Image
              className='w-auto h-12 mx-auto'
              cloudName='dmcookpro'
              publicId={'git-dev/gitdev-logo.svg'}
              alt='gitdev'
              draggable={false}
              width={'100%'}
              height={'100%'}
            />
            <AuthMessage
              headlineClassName={'text-center'}
              subHeadLineClassName={'text-center'}
            />
          </div>
          <Form className='mt-8 space-y-6' onSubmit={onSubmit}>
            <div className='rounded-md shadow-sm -space-y-px'>
              <Input
                id={'email-address'}
                name={'email'}
                type={'email'}
                label={'Email address'}
                autoComplete={'email'}
                register={register('email', { ...AUTH_EMAIL_CONFIG })}
                placeholder={'john.doe@gmail.com'}
                inputBodyClassName={'!mt-0 !shadow-none'}
                inputClassName={
                  '!rounded-none relative !rounded-t-md focus:z-10 !shadow-none'
                }
                labelClassName={'sr-only'}
                registerErrorMessage={errors.email}
              />
              <Input
                id={'password'}
                name={'password'}
                type={showPassword ? 'text' : 'password'}
                label={'Password'}
                autoComplete={'current-password'}
                trailingIcon={
                  showPassword ? (
                    <EyeOffIcon onClick={showPasswordHandler} />
                  ) : (
                    <EyeIcon onClick={showPasswordHandler} />
                  )
                }
                trailingIconClassName={'h-5 w-5 text-slate-700'}
                inputContainerClassName={'cursor-pointer'}
                register={register('password', { required: true })}
                placeholder={'********'}
                inputBodyClassName={'!mt-0 !shadow-none'}
                inputClassName={
                  '!rounded-none relative !rounded-b-md focus:z-10 !shadow-none'
                }
                labelClassName={'sr-only'}
                registerErrorMessage={errors.password}
              />
            </div>

            <div className='flex items-center justify-end'>
              <div className='text-sm'>
                <Link href={'/auth/reset'}>
                  <a className='font-medium text-violet-600 hover:text-violet-500'>
                    Forgot your password?
                  </a>
                </Link>
              </div>
            </div>

            <div>
              <Button
                type='submit'
                loading={loading}
                spinnerClassName={'text-white'}
                className='group relative !flex w-full justify-center text-white bg-violet-600 hover:bg-violet-700'
              >
                {SIGNIN}
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

Signin.propTypes = {};

export async function getServerSideProps(ctx) {
  const { u_token } = parseCookies(ctx);

  if (u_token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default Signin;
