import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { store } from './redux/store';
import App from './App';
import './index.css';

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

if (!clientId) {
  console.error('Google Client ID is not defined. Please check your .env file.');
}

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <GoogleOAuthProvider 
      clientId={clientId}
      onScriptLoadSuccess={() => console.log('Google OAuth loaded successfully')}
      onScriptLoadError={() => console.error('Failed to load Google OAuth')}
    >
      <Provider store={store}>
        <App />
      </Provider>
    </GoogleOAuthProvider>
  //{/* </React.StrictMode> */}
);