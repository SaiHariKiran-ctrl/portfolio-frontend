import React, { useState, useEffect } from 'react';
import styles from './SkillChart.module.css';

const SkillChart = ({ darkMode }) => {
    const [visible, setVisible] = useState(false);

    // Skills data
    const skills = {
        frontend: [
            { name: 'React', value: 90 },
            { name: 'Next.js', value: 85 },
            { name: 'TypeScript', value: 80 },
            { name: 'JavaScript', value: 95 },
            { name: 'HTML/CSS', value: 90 },
        ],
        backend: [
            { name: 'Node.js', value: 85 },
            { name: 'Express', value: 80 },
            { name: 'Python', value: 75 },
            { name: 'REST APIs', value: 90 },
            { name: 'GraphQL', value: 70 },
        ],
        dataBase: [
            { name: 'MongoDB', value: 80 },
            { name: 'PostgreSQL', value: 75 },
            { name: 'MySQL', value: 70 },
            { name: 'Redis', value: 65 },
            { name: 'Firebase', value: 75 },
        ],
    };

    // Animation trigger based on visibility
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                }
            },
            { threshold: 0.2 }
        );

        const chartElement = document.getElementById('skill-chart');
        if (chartElement) {
            observer.observe(chartElement);
        }

        return () => {
            if (chartElement) {
                observer.unobserve(chartElement);
            }
        };
    }, []);

    return (
        <div
            id="skill-chart"
            className={`${styles.skillChart} ${
                darkMode ? styles.darkMode : ''
            }`}>
            <div className={styles.chartContainer}>
                <div className={styles.chartInner}>
                    {Object.entries(skills).map(
                        ([category, skillList], categoryIndex) => (
                            <div key={category} className={styles.category}>
                                <div className={styles.categoryLabel}>
                                    {category === 'frontend'
                                        ? 'Frontend'
                                        : category === 'backend'
                                        ? 'Backend'
                                        : 'Database'}
                                </div>
                                <div className={styles.bars}>
                                    {skillList.map((skill, skillIndex) => (
                                        <div
                                            key={skill.name}
                                            className={styles.barContainer}>
                                            <div className={styles.barName}>
                                                {skill.name}
                                            </div>
                                            <div className={styles.barWrapper}>
                                                <div
                                                    className={styles.barFill}
                                                    style={{
                                                        width: visible
                                                            ? `${skill.value}%`
                                                            : '0%',
                                                        transitionDelay: `${
                                                            (categoryIndex *
                                                                skillList.length +
                                                                skillIndex) *
                                                            0.1
                                                        }s`,
                                                    }}>
                                                    <span
                                                        className={
                                                            styles.barValue
                                                        }>
                                                        {skill.value}%
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                    )}
                </div>

                <div className={styles.chartLegend}>
                    <div className={styles.legendItem}>
                        <span
                            className={styles.legendColor}
                            style={{ backgroundColor: '#3366cc' }}></span>
                        <span>Frontend</span>
                    </div>
                    <div className={styles.legendItem}>
                        <span
                            className={styles.legendColor}
                            style={{ backgroundColor: '#ff6b6b' }}></span>
                        <span>Backend</span>
                    </div>
                    <div className={styles.legendItem}>
                        <span
                            className={styles.legendColor}
                            style={{ backgroundColor: '#20c997' }}></span>
                        <span>Database</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SkillChart;
