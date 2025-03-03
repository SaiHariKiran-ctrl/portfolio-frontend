import React, { useState } from 'react';
import styles from './SkillTabs.module.css';

const SkillTabs = ({ darkMode }) => {
    const [activeTab, setActiveTab] = useState('frontend');

    // Skills data organized by categories
    const skillsData = {
        frontend: [
            { name: 'React.js', level: 95 },
            { name: 'Next.js', level: 90 },
            { name: 'TypeScript', level: 85 },
            { name: 'JavaScript (ES6+)', level: 95 },
            { name: 'HTML5/CSS3', level: 90 },
        ],
        backend: [
            { name: 'Node.js', level: 85 },
            { name: 'Express.js', level: 80 },
            { name: 'Python', level: 75 },
            { name: 'RESTful APIs', level: 90 },
        ],
        devops: [
            { name: 'Git/GitHub', level: 90 },
            { name: 'Apache', level: 65 },
            { name: 'Nginx', level: 60 },
        ],
        databases: [
            { name: 'MySQL', level: 80 },
            { name: 'Firebase', level: 70 },
        ],
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    // Render skill bars based on active tab
    const renderSkillBars = () => {
        const skills = skillsData[activeTab] || [];

        return (
            <div className={styles.skillsGrid}>
                {skills.map((skill, index) => (
                    <div
                        key={skill.name}
                        className={styles.skillBar}
                        style={{ animationDelay: `${index * 0.1}s` }}>
                        <div className={styles.skillInfo}>
                            <span>{skill.name}</span>
                            <span>{skill.level}%</span>
                        </div>
                        <div className={styles.skillProgress}>
                            <div
                                className={styles.skillLevel}
                                style={{ width: `${skill.level}%` }}></div>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    // Certificates data
    const certifications = [
        { title: 'Advanced React & Redux', provider: 'Udemy', year: '2023' },
        { title: 'AI & Machine Learning', provider: 'Coursera', year: '2023' },
        {
            title: 'Full Stack Development',
            provider: 'FreeCodeCamp',
            year: '2022',
        },
    ];

    return (
        <>
            <div className={styles.skillTabs}>
                <div className={styles.tabLinks}>
                    <button
                        className={`${styles.tabLink} ${
                            activeTab === 'frontend' ? styles.active : ''
                        }`}
                        onClick={() => handleTabChange('frontend')}>
                        Frontend
                    </button>
                    <button
                        className={`${styles.tabLink} ${
                            activeTab === 'backend' ? styles.active : ''
                        }`}
                        onClick={() => handleTabChange('backend')}>
                        Backend
                    </button>
                    <button
                        className={`${styles.tabLink} ${
                            activeTab === 'devops' ? styles.active : ''
                        }`}
                        onClick={() => handleTabChange('devops')}>
                        DevOps
                    </button>
                    <button
                        className={`${styles.tabLink} ${
                            activeTab === 'databases' ? styles.active : ''
                        }`}
                        onClick={() => handleTabChange('databases')}>
                        Databases
                    </button>
                </div>

                <div className={styles.tabContent}>
                    {renderSkillBars()}

                    <div className={styles.skillFootnote}>
                        * Skill levels based on project experience and
                        proficiency assessments
                    </div>
                </div>
            </div>

            {/* <div className={styles.skillCertifications}>
                <h3>Recent Certifications</h3>
                <div className={styles.certificationList}>
                    {certifications.map((cert, index) => (
                        <div
                            key={index}
                            className={styles.certBadge}
                            style={{ animationDelay: `${index * 0.15}s` }}>
                            <div className={styles.certIcon}>
                                {cert.provider === 'Udemy' && <span>U</span>}
                                {cert.provider === 'Coursera' && <span>C</span>}
                                {cert.provider === 'FreeCodeCamp' && (
                                    <span>F</span>
                                )}
                            </div>
                            <div className={styles.certInfo}>
                                <h4>{cert.title}</h4>
                                <p>
                                    {cert.provider} - {cert.year}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div> */}
        </>
    );
};

export default SkillTabs;
