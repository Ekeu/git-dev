import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useRouter } from 'next/router';

import {
  SIGNUP_WELCOME,
  SIGNIN_WELCOME,
  SIGNUP_SWITCH,
  SIGNIN_SWITCH,
  SIGNIN,
  SIGNUP_ROUTE,
  SIGNIN_ROUTE,
} from '../../constants/auth';

const AuthMessage = ({ headlineClassName, subHeadLineClassName }) => {
  const router = useRouter();
  const isSignup = router.pathname === SIGNUP_ROUTE;
  return (
    <>
      <h2
        className={`mt-6 text-3xl font-extrabold font-lato text-slate-800 ${headlineClassName}`}
      >
        {isSignup ? SIGNUP_WELCOME : SIGNIN_WELCOME}
      </h2>
      <p
        className={`mt-2 text-sm font-hind text-slate-600 ${subHeadLineClassName}`}
      >
        {isSignup ? SIGNUP_SWITCH : SIGNIN_SWITCH} {isSignup && 'or'}{' '}
        <Link href={isSignup ? SIGNIN_ROUTE : SIGNUP_ROUTE}>
          <a className='font-medium text-violet-600 hover:text-violet-500'>
            {isSignup ? SIGNIN : SIGNUP_SWITCH}
          </a>
        </Link>
      </p>
    </>
  );
};

AuthMessage.propTypes = {};

export default AuthMessage;
