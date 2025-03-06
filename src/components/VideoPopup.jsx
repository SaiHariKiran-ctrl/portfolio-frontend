import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import styles from './VideoPopup.module.css';

const VideoPopup = ({ videoSources }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentVideo, setCurrentVideo] = useState(null);
    const modalRef = useRef(null);
    const videoRef = useRef(null);

    const openPopup = (videoUrl) => {
        setCurrentVideo(videoUrl);
        setIsOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closePopup = () => {
        if (videoRef.current) {
            videoRef.current.pause();
        }
        setIsOpen(false);
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

        if (isOpen) {
            document.addEventListener('keydown', handleEscKey);
        }

        return () => {
            document.removeEventListener('keydown', handleEscKey);
        };
    }, [isOpen]);

    return (
        <>
            <div className={styles.videoGrid}>
                {videoSources.map((video, index) => (
                    <div
                        key={index}
                        className={styles.videoThumbnail}
                        onClick={() => openPopup(video.url)}>
                        <div className={styles.thumbnailOverlay}>
                            <span className={styles.playIcon}>▶</span>
                        </div>
                        {video.thumbnail ? (
                            <img
                                src={video.thumbnail}
                                alt={video.title}
                                className={styles.thumbnailImage}
                            />
                        ) : (
                            <div className={styles.placeholderThumbnail}>
                                <span>{video.title}</span>
                            </div>
                        )}
                        <h4 className={styles.videoTitle}>{video.title}</h4>
                    </div>
                ))}
            </div>

            {isOpen && (
                <div
                    className={styles.modalOverlay}
                    onClick={handleOutsideClick}>
                    <div className={styles.modalContent} ref={modalRef}>
                        <button
                            className={styles.closeButton}
                            onClick={closePopup}>
                            <X size={24} />
                        </button>
                        <div className={styles.videoContainer}>
                            <video
                                ref={videoRef}
                                className={styles.videoPlayer}
                                src={currentVideo}
                                controls
                                autoPlay
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default VideoPopup;
