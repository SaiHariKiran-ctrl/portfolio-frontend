import React, { useRef, useEffect } from 'react';
import {
    BookOpen,
    Code,
    Briefcase,
    Award,
    Layers,
    Link as LinkIcon,
    Home,
    User,
} from 'lucide-react';
import styles from './Sidebar.module.css';

const Sidebar = ({
    isOpen,
    activeSection,
    darkMode,
    onClose,
    toggleButtonRef,
}) => {
    console.log('isOpen', isOpen);
    const sidebarClasses = isOpen
        ? `${styles.sidebar} ${styles.open} ${darkMode ? styles.darkMode : ''}`
        : `${styles.sidebar} ${darkMode ? styles.darkMode : ''}`;

    const sidebarRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!isOpen) return;

            if (
                toggleButtonRef.current &&
                toggleButtonRef.current.contains(event.target)
            ) {
                return;
            }

            if (
                sidebarRef.current &&
                !sidebarRef.current.contains(event.target)
            ) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose, toggleButtonRef]);

    const navLinks = [
        {
            id: 'main',
            title: 'Introduction',
            href: '#',
            icon: <User size={16} />,
        },
        {
            id: 'early-life',
            title: 'Early Life and Education',
            href: '#early-life',
            icon: <BookOpen size={16} />,
        },
        {
            id: 'career',
            title: 'Career',
            href: '#career',
            icon: <Briefcase size={16} />,
        },
        {
            id: 'skills',
            title: 'Technical Skills',
            href: '#skills',
            icon: <Code size={16} />,
        },
        {
            id: 'projects',
            title: 'Projects',
            href: '#projects',
            icon: <Layers size={16} />,
        },
        {
            id: 'references',
            title: 'Contact',
            href: '#references',
            icon: <LinkIcon size={16} />,
        },
    ];

    const handleNavigation = (e, id) => {
        e.preventDefault();

        if (id === 'main') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
            return;
        }

        const element = document.getElementById(id);
        console.log('element', element);
        if (element) {
            const headerOffset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition =
                elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth',
            });
        }

        if (window.innerWidth < 768) {
            onClose();
        }
    };

    return (
        <div className={sidebarClasses} ref={sidebarRef}>
            <div className={styles.sidebarContent}>
                <div className={styles.sidebarHeader}>
                    <h2 className={styles.sidebarTitle}>Sai Hari Kiran</h2>
                    <p className={styles.sidebarSubtitle}>
                        Full Stack Developer
                    </p>
                </div>

                <div className={styles.divider}></div>

                <nav className={styles.sidebarNav}>
                    {navLinks.map((item) => {
                        const isActive = activeSection === item.id;

                        return (
                            <a
                                key={item.id}
                                href={item.href}
                                className={`${styles.navLink} ${
                                    isActive ? styles.activeLink : ''
                                }`}
                                onClick={(e) => handleNavigation(e, item.id)}>
                                <span className={styles.navIcon}>
                                    {item.icon}
                                </span>
                                <span className={styles.navText}>
                                    {item.title}
                                </span>
                            </a>
                        );
                    })}
                </nav>

                <div className={styles.divider}></div>
            </div>
        </div>
    );
};

export default Sidebar;
