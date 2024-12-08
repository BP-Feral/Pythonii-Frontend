import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './components/AuthContext'; // Import the AuthProvider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <React.StrictMode>
      <AuthProvider> {/* Wrap AuthProvider around BrowserRouter */}
         <BrowserRouter>
            <App />
         </BrowserRouter>
      </AuthProvider>
   </React.StrictMode>
);
