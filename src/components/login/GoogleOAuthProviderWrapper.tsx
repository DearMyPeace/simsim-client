import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Platform } from 'react-native';

const clientId = process.env.GOOGLE_CLIENT_ID || '';

const GoogleOAuthProviderWrapper = ({ children }) => {
  if (Platform.OS !== 'web') {
    return <>{children}</>;
  }
  return <GoogleOAuthProvider clientId={clientId}>{children}</GoogleOAuthProvider>;
};

export default GoogleOAuthProviderWrapper;
