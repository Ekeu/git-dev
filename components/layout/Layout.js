import React, { Fragment } from 'react';
import { ToastContainer } from 'react-toastify';
import { useRouter } from 'next/router';

import Header from '../header/Header';
import { NotificationWrapper } from '../../context';

const Layout = ({ children }) => {
  const router = useRouter();

  return (
    <Fragment>
      <NotificationWrapper>
        <Header />
        <ToastContainer
          hideProgressBar
          closeButton={false}
          style={{ width: '25rem', padding: '0px' }}
        />
        <main className='h-full w-full'>{children}</main>
      </NotificationWrapper>
    </Fragment>
  );
};

export default Layout;
