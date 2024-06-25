import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';

const clientId = process.env.GOOGLE_CLIENT_ID || '';

const GoogleOAuthProviderWrapper = ({ children }) => {
  return <GoogleOAuthProvider clientId={clientId}>{children}</GoogleOAuthProvider>;
};

export default GoogleOAuthProviderWrapper;
