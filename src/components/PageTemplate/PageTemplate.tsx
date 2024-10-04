// src/components/PageTemplate/PageTemplate.tsx
import React, { useState, useEffect } from 'react';
import styles from './PageTemplate.module.css';
import NavBar from '../NavBar/NavBar';

interface PageTemplateProps {
    backgroundImage: string;
    children: React.ReactNode;
}

const PageTemplate: React.FC<PageTemplateProps> = ({ backgroundImage, children }) => {
    const [scrollPosition, setScrollPosition] = useState(0);

    const handleScroll = () => {
        const scrollTop = window.scrollY;
        setScrollPosition(scrollTop);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Высчитываем радиус на основе прокрутки
    const borderRadius = Math.max(0, 30 - (scrollPosition + 10) / 10);

    return (
        <>
            <NavBar />
            <div className={styles.pageContainer}>
                <div
                    className={styles.backgroundImage}
                    style={{
                        backgroundImage: `url(${backgroundImage})`,
                    }}
                />
                <div
                    className={styles.content}
                    style={{
                        borderTopLeftRadius: `${borderRadius}px`,
                        borderTopRightRadius: `${borderRadius}px`,
                    }}
                >
                    {children}
                </div>
            </div>
        </>
    );
};

export default PageTemplate;
