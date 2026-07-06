// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { persistor, store } from './redux/store';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';


const clientId = '15482745781-ue5gs6gsbpipt9i4sdhtvv4pqh8uj62d.apps.googleusercontent.com'; // Replace with your actual Google Client ID


if (!clientId) {
  console.error('Google Client ID is not defined. Please check your .env file.');
}

ReactDOM.createRoot(document.getElementById('root')).render(
  //<React.StrictMode>
   <GoogleOAuthProvider 
      clientId={clientId}
      onScriptLoadSuccess={() => console.log('Google OAuth loaded successfully')}
      onScriptLoadError={() => console.error('Failed to load Google OAuth')}
    >
      <Provider store={store}>
     <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
      </Provider>
    </GoogleOAuthProvider>
 // </React.StrictMode>
);