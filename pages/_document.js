import React from 'react';
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin='true'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Hind:wght@300;400;500;600;700&family=Inter:wght@200;300;400;500;600;700&display=swap'
          rel='stylesheet'
        />
      </Head>
      <body>
        <div id='modal-root'></div>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
