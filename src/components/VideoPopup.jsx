import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import styles from './VideoPopup.module.css';

const VideoPopup = ({ videoSources }) => {
    const modalRef = useRef(null);
    const videoRef = useRef(null);
    const video = videoSources[0]; // We only need the first video

    const closePopup = () => {
        if (videoRef.current) {
            videoRef.current.pause();
        }
        document.body.style.overflow = '';
    };

    const handleOutsideClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            closePopup();
        }
    };

    useEffect(() => {
        const handleEscKey = (e) => {
            if (e.key === 'Escape') {
                closePopup();
            }
        };

        document.addEventListener('keydown', handleEscKey);
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleEscKey);
            document.body.style.overflow = '';
        };
    }, []);

    return (
        <div className={styles.modalOverlay} onClick={handleOutsideClick}>
            <div className={styles.modalContent} ref={modalRef}>
                <button className={styles.closeButton} onClick={closePopup}>
                    <X size={24} />
                </button>
                <div className={styles.videoContainer}>
                    <video
                        ref={videoRef}
                        className={styles.videoPlayer}
                        src={video.url}
                        controls
                        autoPlay
                    />
                </div>
            </div>
        </div>
    );
};

export default VideoPopup;
