import React, { useState, useEffect } from 'react';
import WikiPortfolio from './components/WikiPortfolio';
import LoadingScreen from './components/LoadingScreen';

function App() {
    const [loading, setLoading] = useState(true);
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        localStorage.setItem('darkMode', darkMode);
        if (darkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <div className="app">
            {loading ? (
                <LoadingScreen darkMode={darkMode} />
            ) : (
                <WikiPortfolio
                    darkMode={darkMode}
                    toggleDarkMode={toggleDarkMode}
                />
            )}
        </div>
    );
}

export default App;
