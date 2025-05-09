import React from 'react';
import Navbar from '@components/NavBar/index';
import '../styles/globals.css'; // or wherever your global styles are

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Navbar />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
