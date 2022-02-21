import React, { Fragment } from 'react';
import { useRouter } from 'next/router';

import Footer from '../footer/Footer';
import Header from '../header/Header';
import Navbar from '../navbar/Navbar';

const Layout = ({ children }) => {
  const router = useRouter();

  const isAuthPage =
    router.pathname === '/auth/signin' || router.pathname === '/auth/signup';

  return (
    <Fragment>
      <Header />
      {!isAuthPage && <Navbar />}
      <main className='h-full w-full'>{children}</main>
      {!isAuthPage && <Footer />}
    </Fragment>
  );
};

export default Layout;
