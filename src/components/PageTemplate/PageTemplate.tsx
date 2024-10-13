import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './PageTemplate.module.css';
import NavBar from '../NavBar/NavBar';
import Footer from '../NewFooter/Footer';
import BackgroundCarousel from './BackgroundCarousel/BackgroundCarousel';
import BackgroundTextOverlay from './BackgroundTextOverlay/BackgroundTextOverlay';
import { navigationItems } from '../../config/navigation'; // Импортируем навигационные элементы
import { NewsItem } from '../../models/NewsModel'; // Импорт модели NewsItem
import placeholder3 from '../../assets/images/placeholder_3.png';

interface PageTemplateProps {
    backgroundImages?: string[]; // Список изображений (необязательное поле)
    newsItem?: NewsItem[]; // Элемент типа NewsItem (необязательное поле)
    children: React.ReactNode;
};

const PageTemplate: React.FC<PageTemplateProps> = ({ backgroundImages, newsItem, children }) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const location = useLocation();
    if (backgroundImages == undefined && newsItem == undefined) {
        backgroundImages = [placeholder3];
    }
    if (newsItem?.length == 0) {
        backgroundImages = [placeholder3];
        newsItem = undefined;
    }

    const handleScroll = () => {
        if (contentRef.current) {
            const contentTop = contentRef.current.getBoundingClientRect().top;
            const borderRadius = Math.max(0, Math.min(30, (contentTop - 70) / 10));
            const navbarOpacity = contentTop < 70 ? 1 : 0;
            const overlayOpacity = Math.min(0.5 + (570 - contentTop) / 1200, 0.8);

            document.documentElement.style.setProperty('--border-radius', `${borderRadius}px`);
            document.documentElement.style.setProperty('--navbar-bg', `rgba(255, 255, 255, ${navbarOpacity})`);
            document.documentElement.style.setProperty('--overlay-opacity', `${overlayOpacity}`);
        }
    };

    useEffect(() => {
        document.documentElement.style.setProperty('--border-radius', '30px');
        document.documentElement.style.setProperty('--navbar-bg', 'rgba(255, 255, 255, 0)');
        document.documentElement.style.setProperty('--overlay-opacity', '0.5');

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Проверка, если мы не на главной странице
    const isHomePage = location.pathname === '/';

    // Поиск названия страницы по пути из navigationItems
    const currentNavItem = navigationItems.find((item) => item.path === location.pathname);
    const pageTitle = currentNavItem ? currentNavItem.name : '';

    const [currentIndex, setCurrentIndex] = useState(0);
    var items = 3

    if (newsItem != undefined) {
        items = newsItem.length
    }

    useEffect(() => {
        // Автоматическое переключение слайдов каждые 7 секунд
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % items);
        }, 7000);

        return () => clearInterval(interval);
    }, [items]);

    return (
        <>
            <NavBar />
            <div className={styles.pageContainer}>
                {/* Карусель изображений */}
                {/* Карусель изображений или изображение из новости */}
                {backgroundImages ? (
                    <BackgroundCarousel images={backgroundImages} />
                ) : newsItem ? (
                    <div
                        className={styles.backgroundImage}
                        style={{ backgroundImage: `url(${newsItem[currentIndex].image})` }}
                    >
                        <div className={styles.overlay} />
                    </div>
                ) : null}

                {/* Затемняющий слой для всей карусели */}
                <div className={styles.overlay} />

                {/* Отображение текста и кнопки "Вернуться на главную" на внутренних страницах */}
                <BackgroundTextOverlay title={pageTitle} isMain={!isHomePage}/>
                {newsItem != undefined && <BackgroundTextOverlay title={newsItem[currentIndex].title} isMain={!isHomePage}/>}

                {/* Основной контент */}
                <div className={styles.content} ref={contentRef}>
                    {children}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default PageTemplate;
