import React from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App.jsx';
import './index.css';

const GOOGLE_CLIENT_ID = '15482745781-69nig67mgem2r2t3lnsf6d2jc2hh6oan.apps.googleusercontent.com';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider 
      clientId={GOOGLE_CLIENT_ID}
      onScriptLoadError={() => console.log('Google script failed to load')}
      onScriptLoadSuccess={() => console.log('Google script loaded successfully')}
    >
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);