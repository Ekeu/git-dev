import React, { Fragment } from 'react';
import { ToastContainer } from 'react-toastify';
import { useRouter } from 'next/router';

import Footer from '../footer/Footer';
import Header from '../header/Header';
import Navbar from '../navbar/Navbar';
import { NotificationWrapper } from '../../context';

const Layout = ({ children }) => {
  const router = useRouter();

  const isAuthPage =
    router.pathname === '/auth/signin' || router.pathname === '/auth/signup';

  return (
    <Fragment>
      <NotificationWrapper>
        <Header />
        <ToastContainer
          hideProgressBar
          closeButton={false}
          style={{ width: '25rem', padding: '0px' }}
        />
        {!isAuthPage && <Navbar />}
        <main className='h-full w-full'>{children}</main>
        {!isAuthPage && <Footer />}
      </NotificationWrapper>
    </Fragment>
  );
};

export default Layout;
