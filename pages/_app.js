import App from 'next/app';
import Layout from '../components/layout/Layout';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';

class MyApp extends App {
  componentDidMount() {
    document.getElementById('__next').classList.add('h-full', 'w-full');
  }

  render() {
    const { Component } = this.props;

    return (
      <Layout>
        <Component />
      </Layout>
    );
  }
}

export default MyApp;
