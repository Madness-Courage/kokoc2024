import React, { useEffect, useState, useRef } from 'react';
import styles from './InterviewSlider.module.css';
import { NewsItem } from '../../models/NewsModel'; // Убедитесь, что у вас есть модель NewsItem

interface InterviewSliderProps {
    news: NewsItem[];
}

const InterviewSlider: React.FC<InterviewSliderProps> = ({ news }) => {
    // Фильтруем новости с заголовком "Интервью"
    const interviews = news.filter((item) => item.title.includes('Интервью')).slice(-10); // Последние 10 новостей
    const [currentIndex, setCurrentIndex] = useState(0); // Текущий индекс слайдера
    const [progress, setProgress] = useState(0); // Прогресс заполнения активной полоски
    const intervalRef = useRef<NodeJS.Timeout | null>(null); // Реф для хранения интервала

    // Функция для перехода на следующий слайд
    const goToNextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % interviews.length); // Переход на следующий слайд
        setProgress(0); // Сбрасываем прогресс при переходе
    };

    useEffect(() => {
        // Запускаем интервал для заполнения полоски
        intervalRef.current = setInterval(() => {
            setProgress((prev) => {
                if (prev < 100) return prev + 1;
                else {
                    goToNextSlide();
                    return 0;
                }
            });
        }, 50); // Скорость заполнения (50мс для плавного перехода)

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current); // Очистка интервала при размонтировании
        };
    }, [currentIndex]); // Обновляем эффект при изменении слайда

    if (interviews.length === 0) return null; // Не отображаем компонент, если нет интервью

    return (
        <div className={styles.sliderContainer}>
            {/* Отображение текущего слайда */}
            <div className={styles.sliderItem} style={{ backgroundImage: `url(${interviews[currentIndex].image})` }}>
                <div className={styles.titleOverlay}>{interviews[currentIndex].title}</div>
            </div>

            {/* Полоска прогресса */}
            <div className={styles.progressBarContainer}>
                {interviews.map((_, index) => (
                    <div
                        key={index}
                        className={`${styles.progressBarSegment} ${
                            index === currentIndex ? styles.activeSegment : ''
                        }`}
                        style={{ width: `${100 / interviews.length}%` }}
                    >
                        {/* Заполняем активную полоску */}
                        {index === currentIndex && (
                            <div className={styles.progressFill} style={{ width: `${progress}%` }} />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InterviewSlider;
