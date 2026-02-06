import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Toaster } from 'sonner';

// The root architecture of your platform
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    {/* Sonner provides the high-end, minimalist toast notifications 
        seen on premium SaaS platforms. Positioned top-center for engineering authority. */}
    <Toaster 
      position="top-center" 
      expand={false} 
      richColors 
      closeButton
      toastOptions={{
        style: { 
          borderRadius: '20px',
          padding: '16px',
          fontFamily: 'system-ui, sans-serif',
          fontWeight: '600',
          textTransform: 'uppercase',
          fontSize: '10px',
          letterSpacing: '0.1em'
        },
      }}
    />
    
    <App />
  </React.StrictMode>
);