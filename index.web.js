import React from 'react';
import { createRoot } from 'react-dom/client';
import App from '@/App';
import './public/style.css';

const rootNode = document.getElementById('root');
const root = createRoot(rootNode);
root.render(<App />);
