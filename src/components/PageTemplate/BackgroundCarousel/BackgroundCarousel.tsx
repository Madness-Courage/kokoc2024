import React, { useEffect, useState } from 'react';
import styles from './BackgroundCarousel.module.css';

interface BackgroundCarouselProps {
    images: string[];
}

const BackgroundCarousel: React.FC<BackgroundCarouselProps> = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        // Автоматическое переключение слайдов каждые 7 секунд
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 7000);

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className={styles.carousel}>
            {images.map((image, index) => (
                <div
                    key={index}
                    className={`${styles.slide} ${index === currentIndex ? styles.active : ''}`}
                    style={{ backgroundImage: `url(${image})` }}
                />
            ))}
        </div>
    );
};

export default BackgroundCarousel;
