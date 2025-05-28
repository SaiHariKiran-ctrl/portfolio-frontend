import React from 'react';
import { ExternalLink, GitBranch, Code, Star } from 'lucide-react';
import styles from './ProjectCard.module.css';

const ProjectCard = ({ project, darkMode }) => {
    return (
        <div
            className={`${styles.projectCard} ${
                darkMode ? styles.darkMode : ''
            } ${project.featured ? styles.featured : ''}`}>
            {project.featured && (
                <div className={styles.featuredBadge}>Featured</div>
            )}

            <div className={styles.projectHeader}>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                {(project.link || project.gitLink) && (
                    <div className={styles.projectActions}>
                        {project.link && (
                            <a
                                href={project.link}
                                className={styles.actionLink}
                                target="_blank"
                                rel="noopener noreferrer">
                                Live Demo <ExternalLink size={14} />
                            </a>
                        )}
                        {project.gitLink && (
                            <a
                                href={project.gitLink}
                                className={styles.actionLink}
                                target="_blank"
                                rel="noopener noreferrer">
                                View Code <ExternalLink size={14} />
                            </a>
                        )}
                    </div>
                )}
            </div>

            {project.videoUrl && (
                <div className={styles.videoContainer}>
                    <video
                        className={styles.videoPlayer}
                        src={project.videoUrl}
                        controls
                    />
                </div>
            )}

            {/* <p className={styles.projectDescription}>{project.description}</p> */}

            {/* <div className={styles.projectStats}>
                <div className={styles.statItem}>
                    <Star size={16} />
                    <span>{project.stars || 0}</span>
                </div>
                <div className={styles.statItem}>
                    <GitBranch size={16} />
                    <span>{project.forks || 0}</span>
                </div>
                <div className={styles.statItem}>
                    <Code size={16} />
                    <span>{project.language || 'Mixed'}</span>
                </div>
            </div> */}

            <div className={styles.achievementsList}>
                <h4>Key Achievements</h4>
                <ul>
                    {project.achievements.map((achievement, index) => (
                        <li key={index}>{achievement}</li>
                    ))}
                </ul>
            </div>

            <div className={styles.techTags}>
                {project.technologies.map((tech, index) => (
                    <span key={index} className={styles.techTag}>
                        {tech}
                    </span>
                ))}
            </div>

            {project.image && (
                <div className={styles.projectImage}>
                    <div className={styles.mockupDisplay}>
                        <div className={styles.mockupBrowser}>
                            <div className={styles.browserControls}>
                                <span className={styles.browserCircle}></span>
                                <span className={styles.browserCircle}></span>
                                <span className={styles.browserCircle}></span>
                            </div>
                            <div className={styles.browserContent}>
                                <div
                                    className={styles.browserPlaceholder}></div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectCard;
