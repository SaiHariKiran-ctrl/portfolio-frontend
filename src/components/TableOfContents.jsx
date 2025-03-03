import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import styles from './TableOfContents.module.css';

const TableOfContents = ({ activeSection }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    const sections = [
        {
            id: 'early-life',
            title: 'Early Life and Education',
            subsections: [],
        },
        {
            id: 'career',
            title: 'Career',
            subsections: [
                // {
                //     id: 'professional-experience',
                //     title: 'Professional Experience',
                // },
            ],
        },
        { id: 'skills', title: 'Technical Skills', subsections: [] },
        { id: 'projects', title: 'Notable Projects', subsections: [] },
        // {
        //     id: 'publications',
        //     title: 'Publications and Achievements',
        //     subsections: [],
        // },
        { id: 'references', title: 'External Links', subsections: [] },
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
        if (element) {
            const headerOffset = 80; // This should match your header height plus some padding
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition =
                elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth',
            });
        }
    };

    return (
        <div className={styles.tableOfContents}>
            <div className={styles.tocHeader}>
                <h2 className={styles.tocTitle}>Contents</h2>
                <div className={styles.tocControls}>
                    <button className={styles.tocHide} onClick={toggleCollapse}>
                        [{isCollapsed ? 'show' : 'hide'}]
                    </button>
                </div>
            </div>

            {!isCollapsed && (
                <div className={styles.tocBody}>
                    <ol className={styles.tocList}>
                        {sections.map((section, index) => (
                            <li
                                key={section.id}
                                className={`${styles.tocItem} ${
                                    activeSection === section.id
                                        ? styles.activeTocItem
                                        : ''
                                }`}>
                                <a
                                    href={`#${section.id}`}
                                    className={styles.tocLink}
                                    onClick={(e) =>
                                        handleNavigation(e, section.id)
                                    }>
                                    <span className={styles.tocNumber}>
                                        {index + 1}
                                    </span>
                                    <span className={styles.tocText}>
                                        {section.title}
                                    </span>
                                </a>
                                {section.subsections.length > 0 && (
                                    <ol className={styles.tocSublist}>
                                        {section.subsections.map(
                                            (subsection, subIndex) => (
                                                <li
                                                    key={subsection.id}
                                                    className={`${
                                                        styles.tocSubitem
                                                    } ${
                                                        activeSection ===
                                                        subsection.id
                                                            ? styles.activeTocItem
                                                            : ''
                                                    }`}>
                                                    <a
                                                        href={`#${subsection.id}`}
                                                        className={
                                                            styles.tocLink
                                                        }
                                                        onClick={(e) =>
                                                            handleNavigation(
                                                                e,
                                                                subsection.id
                                                            )
                                                        }>
                                                        <span
                                                            className={
                                                                styles.tocNumber
                                                            }>
                                                            {index + 1}.
                                                            {subIndex + 1}
                                                        </span>
                                                        <span
                                                            className={
                                                                styles.tocText
                                                            }>
                                                            {subsection.title}
                                                        </span>
                                                    </a>
                                                </li>
                                            )
                                        )}
                                    </ol>
                                )}
                            </li>
                        ))}
                    </ol>

                    <div className={styles.tocLegend}>
                        <span className={styles.legendDot}></span>
                        <span className={styles.legendText}>
                            Current section
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TableOfContents;
