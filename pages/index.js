import { Fragment, useEffect } from 'react';

import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import { userService } from '../services/user/user';

export default function Home({ user, followers }) {
  useEffect(() => {}, []);
  return (
    <Fragment>
      <Navbar />
      <h1 className='text-3xl font-bold underline'>Hello world!</h1>
      <Footer />
    </Fragment>
  );
}

export async function getServerSideProps(ctx) {
  const data = await userService.fetchUserFromServer(ctx);
  return data;
}
