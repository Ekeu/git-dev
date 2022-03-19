import React, { Fragment } from 'react';
import { ToastContainer } from 'react-toastify';
import { useRouter } from 'next/router';
import Script from 'next/script';

import Header from '../header/Header';
import {
  NotificationWrapper,
  PostsWrapper,
  PostWrapper,
  UserWrapper,
} from '../../context';

const Layout = ({ children }) => {
  const router = useRouter();
  return (
    <Fragment>
      <UserWrapper>
        <PostsWrapper>
          <PostWrapper>
            <NotificationWrapper>
              <Header />
              {router.pathname === '/' && (
                <Script
                  strategy='beforeInteractive'
                  src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
                />
              )}
              <ToastContainer
                hideProgressBar
                closeButton={false}
                style={{ width: '25rem', padding: '0px' }}
              />
              <main className={'h-full w-full'}>{children}</main>
            </NotificationWrapper>
          </PostWrapper>
        </PostsWrapper>
      </UserWrapper>
    </Fragment>
  );
};

export default Layout;
