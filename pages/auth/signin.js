import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { LockClosedIcon, EyeOffIcon, EyeIcon } from '@heroicons/react/solid';
import { Image } from 'cloudinary-react';
import { useForm } from 'react-hook-form';

import Form from '../../components/common/form/form';
import AuthMessage from '../../components/auth/auth-message';
import {
  AUTH_EMAIL_CONFIG,
  AUTH_PASSWORD_CONFIG,
  SIGNIN,
} from '../../constants/auth';
import Input from '../../components/common/input/input';
import Button from '../../components/common/button/button';
import Link from 'next/link';

const Signin = (props) => {
  const [showPassword, setShowPassord] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  const showPasswordHandler = () => setShowPassord(!showPassword);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = handleSubmit(async ({ email, password }) => {});

  useEffect(() => {
    document.documentElement.classList.add('h-full');
    document.body.classList.add('h-full');

    return () => {
      document.documentElement.classList.remove('h-full');
      document.body.classList.remove('h-full');
    };
  }, []);

  console.log(errors.password);

  return (
    <>
      <div className='relative min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-violet-500/40 to-white'>
        <div className='relative max-w-md w-full space-y-8'>
          <div>
            <Image
              className='w-auto h-12 mx-auto'
              cloudName='dmcookpro'
              publicId={'git-dev/gitdev-logo.svg'}
              alt='GitDev'
              draggable={false}
              width={'100%'}
              height={'100%'}
            ></Image>
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
                register={register('email', { required: true })}
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

            <div className='flex items-center justify-between'>
              <div className='flex items-center'>
                <input
                  id='remember-me'
                  name='remember-me'
                  type='checkbox'
                  className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded'
                />
                <label
                  htmlFor='remember-me'
                  className='ml-2 block text-sm text-gray-900'
                >
                  Remember me
                </label>
              </div>

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
                className='group relative !flex w-full justify-center text-white bg-violet-600 hover:bg-violet-700'
              >
                <span className='absolute left-0 inset-y-0 flex items-center pl-3'>
                  <LockClosedIcon
                    className='h-5 w-5 text-violet-500 group-hover:text-violet-400'
                    aria-hidden='true'
                  />
                </span>
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

export default Signin;
