import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const prefersDarkMode =
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedMode = localStorage.getItem('darkMode');
const initialDarkMode =
    savedMode !== null ? savedMode === 'true' : prefersDarkMode;

if (initialDarkMode) {
    document.body.classList.add('dark-mode');
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App initialDarkMode={initialDarkMode} />
    </React.StrictMode>
);
