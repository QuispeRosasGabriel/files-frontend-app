import React from 'react';
import AuthState from "../context/auth/authState"

const MyApp = ({ Component, pageProps }) => (
  <AuthState>
    <Component {...pageProps} />
  </AuthState>
)


export default MyApp
