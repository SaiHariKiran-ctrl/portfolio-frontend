import React from 'react';
import styles from './LoadingScreen.module.css';

const LoadingScreen = ({ darkMode }) => {
    return (
        <div
            className={`${styles.loadingScreen} ${
                darkMode ? styles.darkMode : ''
            }`}>
            <div className={styles.content}>
                {/* <div className={styles.logo}>
                    <div className={styles.wLogo}>W</div>
                </div> */}
                {/* <h1 className={styles.title}>WikiPortfolio</h1> */}
                <div className={styles.loadingBar}>
                    <div className={styles.progress}></div>
                </div>
                <p className={styles.loadingText}>
                    Loading kiran's biography...
                </p>
            </div>
        </div>
    );
};

export default LoadingScreen;
