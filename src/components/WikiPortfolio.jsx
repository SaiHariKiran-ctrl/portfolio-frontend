import React, { useState, useEffect } from 'react';
import {
    ChevronDown,
    ChevronRight,
    Menu,
    ExternalLink,
    Moon,
    Sun,
    Code,
    Zap,
    Award,
    Briefcase,
} from 'lucide-react';
import styles from './WikiPortfolio.module.css';
import Sidebar from './Sidebar';
import TableOfContents from './TableOfContents';
import DynamicYearsCounter from './DynamicYearsCounter';
import SkillTabs from './SkillTabs';
import ContactFormModal from './ContactFormModal';

const WikiPortfolio = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [activeSection, setActiveSection] = useState(null);
    const [showEasterEgg, setShowEasterEgg] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const email = 'saiharikiran.vasu@gmail.com';

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.body.classList.toggle('dark-mode');
    };

    const handleEmailClick = (e) => {
        e.preventDefault();
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    useEffect(() => {
        const handleScroll = () => {
            const sections = document.querySelectorAll('[id]');
            const scrollPosition = window.scrollY + 100;

            sections.forEach((section) => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;

                if (
                    scrollPosition >= sectionTop &&
                    scrollPosition < sectionTop + sectionHeight
                ) {
                    setActiveSection(section.getAttribute('id'));
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const sections = document.querySelectorAll('section[id]');

            if (window.scrollY < 100) {
                setActiveSection('main');
                return;
            }

            let mostVisibleSection = null;
            let maxVisibleAmount = 0;

            sections.forEach((section) => {
                const rect = section.getBoundingClientRect();
                const windowHeight = window.innerHeight;

                const visibleTop = Math.max(0, rect.top);
                const visibleBottom = Math.min(windowHeight, rect.bottom);
                const visibleAmount = Math.max(0, visibleBottom - visibleTop);

                if (visibleAmount > maxVisibleAmount) {
                    maxVisibleAmount = visibleAmount;
                    mostVisibleSection = section.getAttribute('id');
                }
            });

            if (mostVisibleSection) {
                setActiveSection(mostVisibleSection);
            }
        };

        window.addEventListener('scroll', handleScroll);

        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Easter egg in Wikipedia-style
    const triggerEasterEgg = () => {
        setShowEasterEgg(true);
        setTimeout(() => setShowEasterEgg(false), 3000);
    };

    return (
        <div
            className={`${styles.container} ${
                darkMode ? styles.darkMode : ''
            }`}>
            <header className={styles.header}>
                <div className={styles.headerContent}>
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className={styles.menuToggle}
                        aria-label="Toggle sidebar">
                        <Menu size={24} />
                    </button>

                    <div className={styles.headerTitle}>
                        <h1 onClick={triggerEasterEgg}>
                            Vasupalli Sai Hari Kiran
                        </h1>
                        {showEasterEgg && (
                            <div className={styles.easterEgg}>
                                <span>You found a hidden feature! 🎉</span>
                            </div>
                        )}
                    </div>

                    <div className={styles.headerControls}>
                        <button
                            className={styles.darkModeToggle}
                            onClick={toggleDarkMode}
                            aria-label={
                                darkMode
                                    ? 'Switch to light mode'
                                    : 'Switch to dark mode'
                            }>
                            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                        <a href="#references" className={styles.contactLink}>
                            Contact
                        </a>
                    </div>
                </div>
            </header>

            <div className={styles.mainContainer}>
                <Sidebar
                    isOpen={isSidebarOpen}
                    activeSection={activeSection}
                    darkMode={darkMode}
                    onClose={closeSidebar}
                />

                <main className={styles.mainContent}>
                    <article className={styles.article}>
                        {/* <div className={styles.lastUpdated}>
                            <span className={styles.pulse}></span> Last updated:
                            March 2025
                        </div> */}

                        <div className={styles.introduction}>
                            <div className={styles.infobox}>
                                <div className={styles.infoboxHeader}>
                                    {/* <div className={styles.avatar}>
                                        <span>SK</span>
                                    </div> */}
                                    <h3>Sai Hari Kiran</h3>
                                    <p className={styles.subtitle}>
                                        Full Stack Developer
                                    </p>
                                </div>
                                <table className={styles.infoTable}>
                                    <tbody>
                                        <tr>
                                            <th>
                                                <Briefcase
                                                    size={16}
                                                    className={styles.infoIcon}
                                                />{' '}
                                                Experience
                                            </th>
                                            <td>
                                                <DynamicYearsCounter /> years
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <Code
                                                    size={16}
                                                    className={styles.infoIcon}
                                                />{' '}
                                                Expertise
                                            </th>
                                            <td>Web Development, AI</td>
                                        </tr>
                                        <tr>
                                            <th>
                                                <Zap
                                                    size={16}
                                                    className={styles.infoIcon}
                                                />{' '}
                                                Tech Stack
                                            </th>
                                            <td>
                                                React, Node.js, Express.js, SQL
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                                <div className={styles.infoboxLinks}>
                                    <a
                                        href="https://github.com/SaiHariKiran-ctrl"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.infoboxLink}>
                                        GitHub
                                    </a>
                                    <a
                                        href="https://linkedin.com/in/vasupalli-sai-hari-kiran"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.infoboxLink}>
                                        LinkedIn
                                    </a>
                                    <a
                                        href="mailto:saiharikiran.vasu@gmail.com"
                                        className={styles.infoboxLink}
                                        onClick={handleEmailClick}>
                                        Email
                                    </a>
                                </div>
                            </div>

                            <p className={styles.leadParagraph}>
                                <span className={styles.dropCap}>V</span>
                                asupalli{' '}
                                <span className={styles.highlight}>
                                    Sai Hari Kiran
                                </span>{' '}
                                is a skilled Full Stack Developer with over{' '}
                                <DynamicYearsCounter /> years of experience in
                                web development and AI applications. He has
                                worked with modern frontend frameworks, backend
                                systems, and emerging AI technologies, allowing
                                him to build end-to-end solutions
                            </p>

                            {/* <p>
                                Known for creating responsive, user-centric
                                applications ranging from corporate websites to
                                complex corporate dashboards, his work
                                demonstrates a strong commitment to both
                                technical excellence and business impact.
                            </p> */}
                        </div>

                        <TableOfContents activeSection={activeSection} />

                        <section
                            id="early-life"
                            className={`${styles.section} ${
                                activeSection === 'early-life'
                                    ? styles.activeSection
                                    : ''
                            }`}>
                            <h2 className={styles.sectionTitle}>
                                Early Life and Education
                                {/* <a href="#" className={styles.editLink}>
                                    [edit]
                                </a> */}
                            </h2>
                            <div className={styles.sectionContent}>
                                <div className={styles.timelineElement}>
                                    <div className={styles.timelineMarker}>
                                        2023
                                    </div>
                                    <div className={styles.timelineContent}>
                                        <h3>Bachelor of Technology</h3>
                                        <h4>
                                            Electrical and Electronics
                                            Engineering
                                        </h4>
                                        <p>Raghu Institute of Technology</p>
                                        <p>
                                            Graduated with distinction - Score:
                                            77.04%
                                        </p>
                                    </div>
                                </div>

                                <div className={styles.timelineElement}>
                                    <div className={styles.timelineMarker}>
                                        2020
                                    </div>
                                    <div className={styles.timelineContent}>
                                        <h3>Diploma</h3>
                                        <h4>
                                            Electrical and Electronics
                                            Engineering
                                        </h4>
                                        <p>Chaitanya Engineering College</p>
                                        <p>Score: 79.75%</p>
                                    </div>
                                </div>

                                <p>
                                    During college, he discovered his interest
                                    in programming and started exploring
                                    different technologies. In his final year,
                                    he focused on web development, working on
                                    projects to apply his knowledge. Later, he
                                    delved into artificial intelligence,
                                    expanding his expertise and integrating it
                                    with his development skills. This hands-on
                                    experience helped him build a strong
                                    foundation and shaped his career in
                                    full-stack development.
                                </p>

                                <div className={styles.quoteBox}>
                                    <blockquote>
                                        I think college is basically for fun and
                                        to prove you can do your chores, but
                                        they’re not for learning.
                                    </blockquote>
                                    <cite>— Elon Musk</cite>
                                </div>

                                {/* <p>
                                    As a student, he actively participated in
                                    technical competitions and hackathons, where
                                    his innovative problem-solving abilities
                                    earned recognition from peers and faculty
                                    alike. These formative experiences helped
                                    shape his approach to technological
                                    challenges and cultivated the collaborative
                                    mindset that characterizes his work today.
                                </p> */}
                            </div>
                        </section>

                        <section
                            id="career"
                            className={`${styles.section} ${
                                activeSection === 'career'
                                    ? styles.activeSection
                                    : ''
                            }`}>
                            <h2 className={styles.sectionTitle}>
                                Career
                                {/* <a href="#" className={styles.editLink}>
                                    [edit]
                                </a> */}
                            </h2>
                            <div className={styles.sectionContent}>
                                <div className={styles.careerHeader}>
                                    <div className={styles.currentPosition}>
                                        <h3>Full Stack Developer</h3>
                                        <h4>
                                            X-verity Web Design and Graphics
                                        </h4>
                                        <p>June 2023 - Present</p>
                                    </div>

                                    {/* <div className={styles.careerStats}>
                                        <div className={styles.statItem}>
                                            <span className={styles.statNumber}>
                                                50+
                                            </span>
                                            <span className={styles.statLabel}>
                                                Projects
                                            </span>
                                        </div>
                                        <div className={styles.statItem}>
                                            <span className={styles.statNumber}>
                                                300+
                                            </span>
                                            <span className={styles.statLabel}>
                                                Users
                                            </span>
                                        </div>
                                        <div className={styles.statItem}>
                                            <span className={styles.statNumber}>
                                                15k+
                                            </span>
                                            <span className={styles.statLabel}>
                                                Code Lines
                                            </span>
                                        </div>
                                    </div> */}
                                </div>

                                <p>
                                    Since June 2023, Vasupalli Sai Hari Kiran
                                    has been employed as a Full Stack Developer
                                    at X-verity, where he has established
                                    himself as a key technical contributor.
                                    Throughout his tenure, he has successfully
                                    led multiple high-profile projects and
                                    demonstrated exceptional proficiency in
                                    implementing modern web technologies to
                                    address complex business requirements.
                                </p>

                                <div className={styles.projectCard}>
                                    <div className={styles.projectCardHeader}>
                                        <h4>
                                            Corporate Website Development{' '}
                                            <span style={{ fontSize: '14px' }}>
                                                <a
                                                    href="https://qcentrio.com/"
                                                    target="_blank"
                                                    className="flex items-center gap-1 text-blue-600 hover:underline">
                                                    Visit{' '}
                                                    <ExternalLink size={14} />
                                                </a>
                                            </span>
                                        </h4>
                                        {/* <span className={styles.projectBadge}>
                                            Flagship Project
                                        </span> */}
                                    </div>
                                    <p>
                                        In Q3 2023, after months of training in
                                        React, Kiran was assigned his first
                                        project using Next.js. A 50-page dynamic
                                        website for Qcentrio, a leading
                                        industrial solutions provider. Despite
                                        it being his first experience with
                                        Next.js, he quickly adapted,
                                        successfully handling the architecture,
                                        SEO optimization, and performance
                                        improvements. His work on the project
                                        proved his ability to learn new
                                        technologies efficiently and deliver
                                        high-quality results.
                                    </p>
                                    <div className={styles.techStack}>
                                        <span className={styles.techTag}>
                                            Next.js
                                        </span>
                                        <span className={styles.techTag}>
                                            SEO
                                        </span>
                                        <span className={styles.techTag}>
                                            Responsive
                                        </span>
                                    </div>
                                    {/* <div className={styles.projectMetrics}>
                                        <div className={styles.metric}>
                                            <span
                                                className={styles.metricValue}>
                                                40%
                                            </span>
                                            <span
                                                className={styles.metricLabel}>
                                                Improved load times
                                            </span>
                                        </div>
                                        <div className={styles.metric}>
                                            <span
                                                className={styles.metricValue}>
                                                35%
                                            </span>
                                            <span
                                                className={styles.metricLabel}>
                                                Increased traffic
                                            </span>
                                        </div>
                                    </div> */}
                                </div>

                                <div className={styles.projectCard}>
                                    <div className={styles.projectCardHeader}>
                                        <h4>Content Management System</h4>
                                    </div>
                                    <p>
                                        Following the successful deployment of
                                        the Qcentrio website, Kiran developed a
                                        small-scale content management app to
                                        manage content for specific pages and
                                        handle form submissions. This solution
                                        streamlined content updates, allowing
                                        the team to make changes more
                                        efficiently and improving overall
                                        workflow management.
                                    </p>
                                    <div className={styles.techStack}>
                                        <span className={styles.techTag}>
                                            Next.js
                                        </span>
                                        <span className={styles.techTag}>
                                            Rest API
                                        </span>
                                    </div>
                                </div>

                                <div className={styles.projectCard}>
                                    <div className={styles.projectCardHeader}>
                                        <h4>
                                            Electric Meter Management System{' '}
                                            <span style={{ fontSize: '14px' }}>
                                                <a
                                                    href="https://lk-ea.co.in/TGNPDCL/"
                                                    target="_blank"
                                                    className="flex items-center gap-1 text-blue-600 hover:underline">
                                                    Visit{' '}
                                                    <ExternalLink size={14} />
                                                </a>
                                            </span>
                                        </h4>
                                    </div>
                                    <p>
                                        In a significant technical undertaking,
                                        Kiran developed a comprehensive electric
                                        meter management system for L&K, which
                                        was later acquired by L&T. This
                                        enterprise-grade application now serves
                                        over 300 consumers, featuring real-time
                                        consumption monitoring, automated
                                        billing procedures, and detailed
                                        analytics dashboards,
                                    </p>
                                    <div className={styles.techStack}>
                                        <span className={styles.techTag}>
                                            React.js
                                        </span>
                                        <span className={styles.techTag}>
                                            Express.js
                                        </span>
                                        <span className={styles.techTag}>
                                            Rest API
                                        </span>
                                        <span className={styles.techTag}>
                                            Caching
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section
                            id="skills"
                            className={`${styles.section} ${
                                activeSection === 'skills'
                                    ? styles.activeSection
                                    : ''
                            }`}>
                            <h2 className={styles.sectionTitle}>
                                Technical Skills
                                {/* <a href="#" className={styles.editLink}>
                                    [edit]
                                </a> */}
                            </h2>
                            <SkillTabs darkMode={darkMode} />
                        </section>

                        <section
                            id="projects"
                            className={`${styles.section} ${
                                activeSection === 'projects'
                                    ? styles.activeSection
                                    : ''
                            }`}>
                            <h2 className={styles.sectionTitle}>
                                Notable Projects
                                {/* <a href="#" className={styles.editLink}>
                                    [edit]
                                </a> */}
                            </h2>
                            <div className={styles.sectionContent}>
                                <div className={styles.projectGrid}>
                                    {[
                                        {
                                            title: 'Qcentrio Corporate Website',
                                            description:
                                                'A comprehensive 50-page dynamic corporate website featuring advanced SEO optimization and sophisticated performance strategies.',
                                            technologies: [
                                                'Next.js',
                                                'SEO',
                                                'Responsive',
                                            ],
                                            achievements: [
                                                'Successfully built and deployed the first Next.js project, improving development efficiency and maintainability.',
                                                'Enhanced page speed and performance, achieving a 90+ SEO score on Google Lighthouse.',
                                                'Developed a custom CMS for managing specific pages and handling form submissions efficiently.',
                                            ],
                                            featured: false,
                                            link: 'https://qcentrio.com/',
                                            gitLink: '',
                                            videoUrl: null,
                                        },

                                        {
                                            title: 'Electric Meter Management System',
                                            description:
                                                'A comprehensive utility management dashboard serving over 300 consumers with real-time consumption tracking and automated billing.',
                                            technologies: [
                                                'React.js',
                                                'Express.js',
                                                'Rest API',
                                                'Caching',
                                            ],
                                            achievements: [
                                                'Developed an intuitive dashboard enabling real-time tracking of electricity consumption.',
                                                'Optimized API performance, reducing response time by 50% through efficient caching mechanisms.',
                                                'Implemented secure authentication and role-based access control for enhanced data security.',
                                            ],
                                            featured: false,
                                            link: 'https://lk-ea.co.in/TGNPDCL',
                                            gitLink: '',
                                            videoUrl: 'lkea.mp4',
                                        },
                                        {
                                            title: 'Image-to-3D Point Cloud Generator',
                                            description:
                                                'An experimental AI-powered tool for generating accurate 3D point clouds from standard 2D images.',
                                            technologies: [
                                                'Python',
                                                'Pytorch',
                                                'MLP',
                                                'CNN',
                                                'Neural Network',
                                            ],
                                            achievements: [
                                                'Developed a basic neural network to generate 3D point clouds from 2D images as a proof of concept.',
                                                'Tested with a limited dataset, leading to initial overfitting but providing insights for future improvements.',
                                                'Identified key challenges in generalizing point cloud generation, setting the stage for further research.',
                                            ],
                                            featured: false,
                                            link: '',
                                            gitLink:
                                                'https://github.com/SaiHariKiran-ctrl/image-to-point-cloud',
                                            videoUrl: '/img-point-cloud.mp4',
                                        },
                                    ].map((project) => (
                                        <div
                                            key={project.title}
                                            className={`${
                                                styles.projectArticle
                                            } ${
                                                project.featured
                                                    ? styles.featuredProject
                                                    : ''
                                            }`}>
                                            {project.featured && (
                                                <div
                                                    className={
                                                        styles.featuredBadge
                                                    }>
                                                    Featured
                                                </div>
                                            )}
                                            <h3 className={styles.projectTitle}>
                                                {project.title}
                                            </h3>
                                            <p
                                                className={
                                                    styles.projectDescription
                                                }>
                                                {project.description}
                                            </p>
                                            {project.videoUrl && (
                                                <div
                                                    className={
                                                        styles.videoContainer
                                                    }>
                                                    <div
                                                        className={
                                                            styles.videoWrapper
                                                        }>
                                                        <video
                                                            id={`video-${project.id}`}
                                                            className={
                                                                styles.video
                                                            }
                                                            src={
                                                                project.videoUrl
                                                            }
                                                            controls
                                                            autoplay
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                            <h4
                                                className={
                                                    styles.projectSubtitle
                                                }>
                                                Key Achievements
                                            </h4>
                                            <ul className={styles.projectList}>
                                                {project.achievements.map(
                                                    (achievement, index) => (
                                                        <li key={index}>
                                                            {achievement}
                                                        </li>
                                                    )
                                                )}
                                            </ul>

                                            <div className={styles.techTags}>
                                                {project.technologies.map(
                                                    (tech) => (
                                                        <span
                                                            key={tech}
                                                            className={
                                                                styles.techTag
                                                            }>
                                                            {tech}
                                                        </span>
                                                    )
                                                )}
                                            </div>
                                            <div
                                                className={styles.projectLinks}>
                                                {project.link.length > 0 && (
                                                    <a
                                                        target="_blank"
                                                        href={project.link}
                                                        className={
                                                            styles.projectLink
                                                        }>
                                                        Visit
                                                    </a>
                                                )}
                                                {project.gitLink.length > 0 && (
                                                    <a
                                                        target="_blank"
                                                        href={project.gitLink}
                                                        className={
                                                            styles.projectLink
                                                        }>
                                                        Github Link
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* <div className={styles.moreProjects}>
                                    <a
                                        href="#"
                                        className={styles.moreProjectsLink}>
                                        View more projects
                                        <ChevronRight
                                            size={16}
                                            className={styles.moreIcon}
                                        />
                                    </a>
                                </div> */}
                            </div>
                        </section>

                        {/* <section
                            id="publications"
                            className={`${styles.section} ${
                                activeSection === 'publications'
                                    ? styles.activeSection
                                    : ''
                            }`}>
                            <h2 className={styles.sectionTitle}>
                                Publications and Achievements
                                <a href="#" className={styles.editLink}>
                                    [edit]
                                </a>
                            </h2>
                            <div className={styles.sectionContent}>
                                <div className={styles.publicationsContainer}>
                                    <div className={styles.publicationEntry}>
                                        <div
                                            className={
                                                styles.publicationIcon
                                            }></div>
                                        <div
                                            className={
                                                styles.publicationContent
                                            }>
                                            <h3>
                                                Technical Blog: "Optimizing
                                                React Performance in Corporate
                                                Applications"
                                            </h3>
                                            <p
                                                className={
                                                    styles.publicationDetails
                                                }>
                                                Published on Medium, December
                                                2023
                                            </p>
                                            <div
                                                className={
                                                    styles.publicationStats
                                                }>
                                                <span
                                                    className={styles.statItem}>
                                                    15K+ views
                                                </span>
                                                <span
                                                    className={styles.statItem}>
                                                    230+ claps
                                                </span>
                                                <span
                                                    className={styles.statItem}>
                                                    45+ comments
                                                </span>
                                            </div>
                                            <p>
                                                A comprehensive examination of
                                                advanced performance
                                                optimization techniques for
                                                large-scale React applications,
                                                featuring real-world
                                                implementation examples and
                                                measurable improvement metrics.
                                                The article received significant
                                                community engagement, with over
                                                15,000 views and numerous
                                                positive industry responses.
                                            </p>
                                            <a
                                                href="#"
                                                className={
                                                    styles.publicationLink
                                                }>
                                                Read Article{' '}
                                                <ExternalLink size={14} />
                                            </a>
                                        </div>
                                    </div>

                                    <div className={styles.publicationEntry}>
                                        <div
                                            className={
                                                styles.publicationIcon
                                            }></div>
                                        <div
                                            className={
                                                styles.publicationContent
                                            }>
                                            <h3>
                                                Regional Web Development
                                                Competition - First Place
                                            </h3>
                                            <p
                                                className={
                                                    styles.publicationDetails
                                                }>
                                                Tech Innovators Summit, June
                                                2023
                                            </p>
                                            <div className={styles.awardBadge}>
                                                <span>🏆 First Place</span>
                                            </div>
                                            <p>
                                                Awarded first place in a
                                                competitive regional web
                                                development challenge that
                                                assessed technical proficiency,
                                                creative problem-solving, and
                                                implementation efficiency. The
                                                winning entry demonstrated
                                                excellent application
                                                architecture, accessibility
                                                compliance, and innovative user
                                                experience design.
                                            </p>
                                        </div>
                                    </div>

                                    <div className={styles.publicationEntry}>
                                        <div
                                            className={
                                                styles.publicationIcon
                                            }></div>
                                        <div
                                            className={
                                                styles.publicationContent
                                            }>
                                            <h3>
                                                Open Source Contribution: UI
                                                Component Library
                                            </h3>
                                            <p
                                                className={
                                                    styles.publicationDetails
                                                }>
                                                GitHub, Ongoing since 2022
                                            </p>
                                            <div
                                                className={
                                                    styles.contributionGraph
                                                }>
                                                <div
                                                    className={styles.graphCol}>
                                                    <div
                                                        className={
                                                            styles.graphDay
                                                        }
                                                        style={{
                                                            height: '40%',
                                                        }}></div>
                                                    <div
                                                        className={
                                                            styles.graphDay
                                                        }
                                                        style={{
                                                            height: '70%',
                                                        }}></div>
                                                    <div
                                                        className={
                                                            styles.graphDay
                                                        }
                                                        style={{
                                                            height: '30%',
                                                        }}></div>
                                                    <div
                                                        className={
                                                            styles.graphDay
                                                        }
                                                        style={{
                                                            height: '90%',
                                                        }}></div>
                                                    <div
                                                        className={
                                                            styles.graphDay
                                                        }
                                                        style={{
                                                            height: '50%',
                                                        }}></div>
                                                    <div
                                                        className={
                                                            styles.graphDay
                                                        }
                                                        style={{
                                                            height: '60%',
                                                        }}></div>
                                                    <div
                                                        className={
                                                            styles.graphDay
                                                        }
                                                        style={{
                                                            height: '80%',
                                                        }}></div>
                                                </div>
                                            </div>
                                            <p>
                                                Active contributor to a popular
                                                open-source React component
                                                library, with multiple accepted
                                                pull requests focusing on
                                                accessibility improvements,
                                                performance optimizations, and
                                                expanded component
                                                functionality. Contributions
                                                have benefited thousands of
                                                developers utilizing the library
                                                in production applications.
                                            </p>
                                            <a
                                                href="#"
                                                className={
                                                    styles.publicationLink
                                                }>
                                                View Repository{' '}
                                                <ExternalLink size={14} />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section> */}

                        <section
                            id="references"
                            className={`${styles.section} ${
                                activeSection === 'references'
                                    ? styles.activeSection
                                    : ''
                            }`}>
                            <h2 className={styles.sectionTitle}>
                                External Links
                                {/* <a href="#" className={styles.editLink}>
                                    [edit]
                                </a> */}
                            </h2>
                            <div className={styles.sectionContent}>
                                <div className={styles.externalLinksGrid}>
                                    <a
                                        href="https://linkedin.com/in/vasupalli-sai-hari-kiran"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.externalCard}>
                                        <div
                                            className={styles.externalCardIcon}>
                                            <svg
                                                viewBox="0 0 24 24"
                                                width="24"
                                                height="24"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                fill="none"
                                                strokeLinecap="round"
                                                strokeLinejoin="round">
                                                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                                <rect
                                                    x="2"
                                                    y="9"
                                                    width="4"
                                                    height="12"></rect>
                                                <circle
                                                    cx="4"
                                                    cy="4"
                                                    r="2"></circle>
                                            </svg>
                                        </div>
                                        <div
                                            className={
                                                styles.externalCardContent
                                            }>
                                            <h3>LinkedIn Profile</h3>
                                            <p>
                                                Connect professionally and view
                                                career history
                                            </p>
                                        </div>
                                        <ExternalLink
                                            size={14}
                                            className={styles.externalCardLink}
                                        />
                                    </a>

                                    <a
                                        href="https://github.com/saiharikiran-ctrl"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.externalCard}>
                                        <div
                                            className={styles.externalCardIcon}>
                                            <svg
                                                viewBox="0 0 24 24"
                                                width="24"
                                                height="24"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                fill="none"
                                                strokeLinecap="round"
                                                strokeLinejoin="round">
                                                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                                            </svg>
                                        </div>
                                        <div
                                            className={
                                                styles.externalCardContent
                                            }>
                                            <h3>GitHub Repository</h3>
                                            <p>
                                                Explore code samples and
                                                open-source contributions
                                            </p>
                                        </div>
                                        <ExternalLink
                                            size={14}
                                            className={styles.externalCardLink}
                                        />
                                    </a>

                                    <a
                                        href="mailto:saiharikiran.vasu@gmail.com"
                                        className={styles.externalCard}
                                        onClick={handleEmailClick}>
                                        <div
                                            className={styles.externalCardIcon}>
                                            <svg
                                                viewBox="0 0 24 24"
                                                width="24"
                                                height="24"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                fill="none"
                                                strokeLinecap="round"
                                                strokeLinejoin="round">
                                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                                <polyline points="22,6 12,13 2,6"></polyline>
                                            </svg>
                                        </div>
                                        <div
                                            className={
                                                styles.externalCardContent
                                            }>
                                            <h3>Email Contact</h3>
                                            <p>
                                                Direct professional inquiries
                                                and opportunities
                                            </p>
                                        </div>
                                        <ExternalLink
                                            size={14}
                                            className={styles.externalCardLink}
                                        />
                                    </a>
                                </div>

                                {/* <div className={styles.contactCTA}>
                                    <h3>Ready to collaborate?</h3>
                                    <p>
                                        I'm currently available for freelance
                                        projects and full-time opportunities.
                                    </p>
                                    <a
                                        href="mailto:saiharikiran.vasu@gmail.com"
                                        className={styles.contactButton}>
                                        Get in Touch
                                    </a>
                                </div> */}
                            </div>
                        </section>
                        <ContactFormModal
                            isOpen={isModalOpen}
                            onClose={closeModal}
                            recipientEmail={email}
                            darkMode={darkMode}
                        />

                        {/* <footer className={styles.articleFooter}>
                            <div className={styles.footerCategories}>
                                <span>Categories:</span>
                                <a href="#">Web Developers</a> |
                                <a href="#">Full Stack Engineers</a> |
                                <a href="#">AI Specialists</a>
                            </div>

                            <div className={styles.footerNavigation}>
                                <a href="#" className={styles.footerLink}>
                                    View History
                                </a>
                                <a href="#" className={styles.footerLink}>
                                    Cite This Page
                                </a>
                                <a href="#" className={styles.footerLink}>
                                    Download PDF
                                </a>
                            </div>
                        </footer> */}
                    </article>
                </main>
            </div>
        </div>
    );
};

export default WikiPortfolio;
