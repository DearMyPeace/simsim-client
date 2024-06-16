import React from 'react';
import { createRoot } from 'react-dom';
import App from './src/App';

const rootNode = document.getElementById('root');
createRoot(rootNode).render(<App />);
