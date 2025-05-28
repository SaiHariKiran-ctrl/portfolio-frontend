import React, { useState, useEffect, useRef } from 'react';
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
    Download,
} from 'lucide-react';
import styles from './WikiPortfolio.module.css';
import Sidebar from './Sidebar';
import TableOfContents from './TableOfContents';
import DynamicYearsCounter from './DynamicYearsCounter';
import SkillTabs from './SkillTabs';
import ContactFormModal from './ContactFormModal';
import ProjectCard from './ProjectCard';

const WikiPortfolio = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [activeSection, setActiveSection] = useState(null);
    const [showEasterEgg, setShowEasterEgg] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const toggleButtonRef = useRef(null);

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
                        ref={toggleButtonRef}
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className={styles.menuToggle}
                        aria-label="Toggle sidebar">
                        <Menu size={24} />
                    </button>

                    <div className={styles.headerTitle}>
                        <h1>Vasupalli Sai Hari Kiran</h1>
                        {/* {showEasterEgg && (
                            <div className={styles.easterEgg}>
                                <span>You found a hidden feature! 🎉</span>
                            </div>
                        )} */}
                    </div>

                    <div className={styles.headerControls}>
                        {/* <button
                            className={styles.darkModeToggle}
                            onClick={toggleDarkMode}
                            aria-label={
                                darkMode
                                    ? 'Switch to light mode'
                                    : 'Switch to dark mode'
                            }>
                            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                        </button> */}
                        <a
                            href="/sai_hari_kiran_resume.pdf"
                            download
                            className={styles.downloadResume}
                            aria-label="Download Resume">
                            Download Resume
                        </a>
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
                    toggleButtonRef={toggleButtonRef}
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
                                                Marital Status
                                            </th>
                                            <td>Single</td>
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
                                Driven by a passion for innovation, web
                                development has been my gateway to achieving it.
                                I thrive on the excitement of continuous
                                learning, eagerly expanding my knowledge each
                                day. Being a developer is not just a career for
                                me, it's a genuine pursuit of what I truly love.
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

                                <div className={styles.timelineElement}>
                                    <div className={styles.timelineMarker}>
                                        2017
                                    </div>
                                    <div className={styles.timelineContent}>
                                        <h3>SSC</h3>
                                        {/* <h4>Secondary School Certificate</h4> */}
                                        <p>New Life English Medium School</p>
                                        <p>Score: 88%</p>
                                    </div>
                                </div>

                                {/* <p>
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
                                        they're not for learning.
                                    </blockquote>
                                    <cite>— Elon Musk</cite>
                                </div> */}

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

                                {/* <p>
                                    Since June 2023, Vasupalli Sai Hari Kiran
                                    has been employed as a Full Stack Developer
                                    at X-verity, where he has established
                                    himself as a key technical contributor.
                                    Throughout his tenure, he has successfully
                                    led multiple high-profile projects and
                                    demonstrated exceptional proficiency in
                                    implementing modern web technologies to
                                    address complex business requirements.
                                </p> */}

                                <ul className={styles.bulletPoints}>
                                    <li>
                                        Currently working as a Full Stack Web
                                        Developer, contributing to various
                                        challenging projects
                                    </li>
                                    <li>
                                        Developed and executed solutions,
                                        continuously extended technical
                                        capabilities
                                    </li>
                                    <li>
                                        Consistently learned and applied new
                                        technologies to meet project demands
                                    </li>
                                </ul>
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
                            <h2 className={styles.sectionTitle}>Projects</h2>
                            <div className={styles.sectionContent}>
                                <div className={styles.projectGrid}>
                                    {[
                                        {
                                            title: 'Custom Content Management System (CMS)',
                                            description:
                                                'Architected and developed a custom CMS application to streamline content management for internal and client-facing web applications.',
                                            technologies: [
                                                'Next.js',
                                                'React',
                                                'Node.js',
                                                'SQL',
                                            ],
                                            achievements: [
                                                'Architected and developed a custom CMS application to streamline content management for internal and client-facing web applications.',
                                                'Enabled dynamic control over blogs, service pages, landing pages, and other web content types.',
                                                'Integrated form data management, empowering teams to collect and manage submissions effectively.',
                                                "Delivered a scalable, user-friendly solution tailored to the organization's evolving content needs.",
                                            ],
                                            featured: false,
                                            link: '',
                                            gitLink: '',
                                            videoUrl: null,
                                        },
                                        {
                                            title: 'Qcentrio – Corporate Website Development',
                                            description:
                                                'Built a 50+ page dynamic website for Qcentrio, an AI-driven solutions provider, using Next.js to ensure high performance and SEO optimization.',
                                            technologies: [
                                                'Next.js',
                                                'React',
                                                'Custom CMS',
                                            ],
                                            achievements: [
                                                'Built a 50+ page dynamic website for Qcentrio, an AI-driven solutions provider, using Next.js to ensure high performance and SEO optimization.',
                                                'Seamlessly integrated the previously developed custom CMS, enabling easy content updates and form management.',
                                                'Ensured responsive design, accessibility, and maintainability across all pages and components.',
                                            ],
                                            featured: false,
                                            link: 'https://qcentrio.com/',
                                            gitLink: '',
                                            videoUrl: null,
                                        },
                                        {
                                            title: 'Best Infra – Energy Management Platform',
                                            description:
                                                'Developed a web-based Energy Management Tool to monitor energy consumption, manage client usage, and automate billing processes.',
                                            technologies: [
                                                'React',
                                                'Node.js',
                                                'REST APIs',
                                            ],
                                            achievements: [
                                                'Developed a web-based Energy Management Tool to monitor energy consumption, manage client usage, and automate billing processes.',
                                                'Implemented real-time tracking and analytics dashboards for energy units, offering actionable insights to clients.',
                                                'Improved operational efficiency and billing transparency through smart automation features.',
                                            ],
                                            featured: false,
                                            link: '',
                                            gitLink: '',
                                            videoUrl: '/vids/lkea.mp4',
                                        },
                                        {
                                            title: 'No-Code Dashboard Page Builder (In Progress)',
                                            description:
                                                'Building a no-code platform that enables users to create complete dashboard applications without writing a single line of code.',
                                            technologies: [
                                                'Next.js',
                                                'React',
                                                'Drag-and-Drop Libraries',
                                            ],
                                            achievements: [
                                                'Building a no-code platform that enables users to create complete dashboard applications without writing a single line of code.',
                                                'Provides a growing set of pre-built modules (Billing, Reports, Settings, Dashboards) and reusable UI components.',
                                                "Features a drag-and-drop page builder to support custom module creation when templates aren't sufficient.",
                                                'Supports one-click export of production-ready source code, ideal for non-technical users and rapid prototyping.',
                                                'Focused on scalability, modular design, and usability using the Next.js framework.',
                                            ],
                                            featured: false,
                                            link: '',
                                            gitLink: '',
                                            videoUrl: null,
                                        },
                                        {
                                            title: 'Image to Point Cloud Generator (Prototype)',
                                            description:
                                                'Developed a proof-of-concept neural network to convert 2D images into 3D point clouds, aimed at applications in 3D reconstruction and computer vision.',
                                            technologies: [
                                                'Python',
                                                'PyTorch',
                                                'Neural Networks',
                                                'Open3D',
                                            ],
                                            achievements: [
                                                'Developed a proof-of-concept neural network to convert 2D images into 3D point clouds, aimed at applications in 3D reconstruction and computer vision.',
                                                'Successfully overfitted on a small dataset to validate the model architecture and functionality during initial testing.',
                                                'Utilized libraries such as PyTorch for model building and Open3D for point cloud visualization.',
                                                'Currently planning to expand the project with a larger, more diverse dataset and incorporate regularization techniques for better generalization.',
                                            ],
                                            featured: false,
                                            link: '',
                                            gitLink:
                                                'https://github.com/SaiHariKiran-ctrl/image-to-point-cloud',
                                            videoUrl:
                                                '/vids/img-point-cloud.mp4',
                                        },
                                    ].map((project, index) => (
                                        <ProjectCard
                                            key={index}
                                            project={project}
                                            darkMode={darkMode}
                                        />
                                    ))}
                                </div>
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
