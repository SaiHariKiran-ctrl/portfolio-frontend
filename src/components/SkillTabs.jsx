import React from 'react';
import styles from './SkillTabs.module.css';

const SkillTabs = ({ darkMode }) => {
    // Skills data organized by categories
    const skillsData = {
        frontend: {
            title: 'Front-End Development',
            icon: '💻',
            description: 'Core web technologies and modern frameworks',
            skills: [
                'HTML5',
                'CSS3',
                'JavaScript (ES6+)',
                'TypeScript',
                'React.js',
                'Vite',
            ],
        },
        uiFrameworks: {
            title: 'UI Frameworks & Styling',
            icon: '🎨',
            description: 'Modern styling solutions and component libraries',
            skills: ['Tailwind CSS', 'Bootstrap', 'CSS Modules', 'SCSS'],
        },
        stateManagement: {
            title: 'State Management',
            icon: '🔄',
            description: 'Data flow and state handling solutions',
            skills: ['Context API', 'Redux Toolkit', 'React Query'],
        },
        backend: {
            title: 'Back-End Development',
            icon: '⚙️',
            description: 'Server-side technologies and API development',
            skills: [
                'Node.js',
                'Express.js',
                'RESTful APIs',
                'Authentication & Authorization',
            ],
        },
        databases: {
            title: 'Databases',
            icon: '🗄️',
            description: 'Database management and optimization',
            skills: ['MySQL', 'PostgreSQL', 'Neon DB'],
        },
        fullStack: {
            title: 'Full-Stack Framework',
            icon: '🚀',
            description: 'End-to-end development solutions',
            skills: ['Next.js', 'API Routes', 'SSR/ISR', 'App Router'],
        },
        payments: {
            title: 'Billing & Payments',
            icon: '💳',
            description: 'Payment processing and subscription management',
            skills: ['Zoho Billing', 'Razorpay'],
        },
        tools: {
            title: 'Tools & DevOps',
            icon: '🛠️',
            description: 'Development tools and deployment solutions',
            skills: ['Git/GitHub', 'Postman', 'Swagger', 'ESLint/Prettier'],
        },
        deployment: {
            title: 'Deployment & Hosting',
            icon: '☁️',
            description: 'Cloud platforms and hosting solutions',
            skills: ['Vercel', 'Netlify', 'AWS', 'Hostinger/cPanel'],
        },
        design: {
            title: 'Designing Tools',
            icon: '🎯',
            description: 'UI/UX design and prototyping',
            skills: ['Figma'],
        },
    };

    return (
        <div
            className={`${styles.skillsContainer} ${
                darkMode ? styles.darkMode : ''
            }`}>
            <div className={styles.skillsGrid}>
                {Object.entries(skillsData).map(([key, category]) => (
                    <div key={key} className={styles.skillCard}>
                        <div className={styles.skillCardHeader}>
                            <div className={styles.categoryInfo}>
                                <span className={styles.categoryIcon}>
                                    {category.icon}
                                </span>
                                <div>
                                    <h3 className={styles.categoryTitle}>
                                        {category.title}
                                    </h3>
                                    <p className={styles.categoryDescription}>
                                        {category.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.skillList}>
                            {category.skills.map((skill) => (
                                <div key={skill} className={styles.skillItem}>
                                    <span className={styles.skillName}>
                                        {skill}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <div className={styles.skillFootnote}>
                * Skill levels based on project experience and proficiency
                assessments
            </div>
        </div>
    );
};

export default SkillTabs;
