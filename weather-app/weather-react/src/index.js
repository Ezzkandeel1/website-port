import React from 'react';
import ReactDOM from 'react-dom/client'; // Use createRoot for React 18
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Create a root and render the App component
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Optional: Measure performance in your app
reportWebVitals();
