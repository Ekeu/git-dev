import React, { Fragment } from 'react';
import { ToastContainer } from 'react-toastify';
import { useRouter } from 'next/router';
import Script from 'next/script';

import Header from '../header/Header';
import { NotificationWrapper } from '../../context';
import { UserWrapper } from '../../context/User/UserWrapper';
import { PostWrapper } from '../../context/Post/PostWrapper';

const Layout = ({ children }) => {
  const router = useRouter();

  return (
    <Fragment>
      <UserWrapper>
        <PostWrapper>
          <NotificationWrapper>
            <Header />
            <Script
              strategy='beforeInteractive'
              src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
            />
            <ToastContainer
              hideProgressBar
              closeButton={false}
              style={{ width: '25rem', padding: '0px' }}
            />
            <main className='h-full w-full'>{children}</main>
          </NotificationWrapper>
        </PostWrapper>
      </UserWrapper>
    </Fragment>
  );
};

export default Layout;
