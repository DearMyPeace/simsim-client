import React, { useEffect } from 'react';
import * as RNIap from 'react-native-iap';

const IapInitializer: React.FC = () => {
  useEffect(() => {
    const setupIap = async () => {
      try {
        await RNIap.initConnection();
        console.log('IAP connection established');
      } catch (err) {
        console.error('IAP initialization failed:', err);
      }
    };

    setupIap();

    return () => {
      RNIap.endConnection();
    };
  }, []);

  return null;
};

export default IapInitializer;
