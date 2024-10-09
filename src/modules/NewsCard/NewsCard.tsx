import React, { useRef, useEffect, useState } from 'react';
import styles from './NewsCard.module.css';

interface NewsItemProps {
    item: {
        id: number;
        image: string;
        title: string;
        description: string;
        date: string;
        time: string;
    };
}

const NewsCard: React.FC<NewsItemProps> = ({ item }) => {
    const titleRef = useRef<HTMLHeadingElement>(null);
    const descriptionRef = useRef<HTMLParagraphElement>(null);
    const [isOverflowing, setIsOverflowing] = useState(false);

    useEffect(() => {
        const checkOverflow = () => {
            if (titleRef.current && descriptionRef.current) {
                const titleOverflows = titleRef.current.scrollHeight > titleRef.current.clientHeight;
                const descriptionOverflows = descriptionRef.current.scrollHeight > descriptionRef.current.clientHeight;
                setIsOverflowing(titleOverflows || descriptionOverflows);
            }
        };

        checkOverflow();
        window.addEventListener('resize', checkOverflow);
        return () => window.removeEventListener('resize', checkOverflow);
    }, []);

    return (
        <div className={`${styles.newsItem} ${isOverflowing ? styles.overflowing : ''}`}>
            {/* Картинка новости */}
            <img src={item.image} alt={item.title} className={styles.newsImage} />
            {/* Текст и описание */}
            <div className={styles.newsOverlay}>
                <h3 ref={titleRef} className={styles.newsTitle}>{item.title}</h3>
                <p ref={descriptionRef} className={styles.newsDescription}>{item.description}</p>
                <span className={styles.newsDate}>
                    {/* Форматируем дату в ДД.ММ */}
                    <span className={styles.datePart}>
                        {new Date(item.date).toLocaleDateString('ru-RU', {
                            day: '2-digit',
                            month: '2-digit',
                        })}
                    </span>
                    <span className={styles.timePart}> — {item.time}</span>
                </span>
            </div>
        </div>
    );
};

export default NewsCard;
