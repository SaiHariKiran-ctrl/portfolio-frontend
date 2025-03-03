import React, { useState } from 'react';
import {
    ExternalLink,
    ChevronDown,
    ChevronUp,
    GitBranch,
    Code,
    Star,
} from 'lucide-react';
import styles from './ProjectCard.module.css';

const ProjectCard = ({ project, darkMode }) => {
    const [expanded, setExpanded] = useState(false);

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
                <button
                    className={styles.expandButton}
                    onClick={() => setExpanded(!expanded)}
                    aria-label={
                        expanded
                            ? 'Collapse project details'
                            : 'Expand project details'
                    }>
                    {expanded ? (
                        <ChevronUp size={18} />
                    ) : (
                        <ChevronDown size={18} />
                    )}
                </button>
            </div>

            <p className={styles.projectDescription}>{project.description}</p>

            <div className={styles.projectStats}>
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
            </div>

            <div className={styles.techTags}>
                {project.technologies.map((tech, index) => (
                    <span key={index} className={styles.techTag}>
                        {tech}
                    </span>
                ))}
            </div>

            {expanded && (
                <div className={styles.expandedContent}>
                    <div className={styles.achievementsList}>
                        <h4>Key Achievements</h4>
                        <ul>
                            {project.achievements.map((achievement, index) => (
                                <li key={index}>{achievement}</li>
                            ))}
                        </ul>
                    </div>

                    {project.image && (
                        <div className={styles.projectImage}>
                            <div className={styles.mockupDisplay}>
                                <div className={styles.mockupBrowser}>
                                    <div className={styles.browserControls}>
                                        <span
                                            className={
                                                styles.browserCircle
                                            }></span>
                                        <span
                                            className={
                                                styles.browserCircle
                                            }></span>
                                        <span
                                            className={
                                                styles.browserCircle
                                            }></span>
                                    </div>
                                    <div className={styles.browserContent}>
                                        <div
                                            className={
                                                styles.browserPlaceholder
                                            }></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            <div className={styles.projectActions}>
                <a
                    href={project.demoUrl || '#'}
                    className={styles.actionLink}
                    target="_blank"
                    rel="noopener noreferrer">
                    Live Demo <ExternalLink size={14} />
                </a>
                <a
                    href={project.codeUrl || '#'}
                    className={styles.actionLink}
                    target="_blank"
                    rel="noopener noreferrer">
                    View Code <ExternalLink size={14} />
                </a>
            </div>
        </div>
    );
};

export default ProjectCard;
