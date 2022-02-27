import { useEffect } from 'react';
import Layout from '../components/layout/Layout';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    document.getElementById('__next').classList.add('h-full', 'w-full');
  }, []);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
