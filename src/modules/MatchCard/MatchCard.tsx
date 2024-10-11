import React, { useEffect, useState } from 'react';
import styles from './MatchCard.module.css'
import placeholderLogo from '../../assets/images/placeholder_3.png'
import kokosLogo from '../../assets/images/logo.svg'
import { Match } from '../../models/MatchModel'
import { format } from 'date-fns'

interface MatchCardProps {
    match: Match; // Пропс, принимающий данные типа Match
}

const MatchCard: React.FC<MatchCardProps> = ({ match }) => {
    const formattedDate = format(new Date(match.date), 'dd.MM');

    // Переменные для вычисления размеров iframe (16:9)
    const [iframeDimensions, setIframeDimensions] = useState({ width: 640, height: 360 });

    useEffect(() => {
        const updateIframeDimensions = () => {
            const width = window.innerWidth * 0.6; // Ширина 90% от экрана пользователя
            const height = width * 9 / 16; // Соотношение сторон 16:9
            setIframeDimensions({ width, height });
        };

        updateIframeDimensions(); // Обновляем при монтировании компонента
        window.addEventListener('resize', updateIframeDimensions); // Обновляем при изменении размера окна

        return () => {
            window.removeEventListener('resize', updateIframeDimensions);
        };
    }, []);

    return (
        <div className={styles.matchCard}>
            {/* Левая колонка: Дата, время и место */}
            <div className={styles.matchDetails}>
                <p className={styles.date}><strong>{formattedDate}</strong></p>
                <p className={styles.time}>{match.time}</p>
                <p className={styles.place}>{match.place}</p>
            </div>

            {/* Центральная колонка: Логотипы команд и "VS" */}
            <div className={styles.teams}>
                <div className={styles.team}>
                    <img src={kokosLogo} alt="Kokos Grupp Logo" className={styles.logo} />
                    <p className={styles.teamName}>КОКОС ГРУПП</p>
                </div>
                <p className={styles.vs}>VS</p>
                <div className={styles.team}>
                    <img src={match.opponentLogo} alt={`${match.opponentName} Logo`} className={styles.logo} />
                    <p className={styles.teamName}>{match.opponentName}</p>
                </div>
            </div>

            {/* Правая колонка: Кнопка регистрации */}
            <div className={styles.registration}>
                <a href={match.registerLink} className={styles.registerButton}>
                    ЗАРЕГИСТРИРОВАТЬСЯ →
                </a>
            </div>

            {/* Если isActive и airUrl установлены, показываем iframe */}
            {match.isActive && match.airUrl && (
                <div className={styles.iframeContainer}>
                    <iframe
                        src={match.airUrl}
                        width={iframeDimensions.width}
                        height={iframeDimensions.height}
                        allow="autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock;"
                        frameBorder="0"
                        allowFullScreen
                    ></iframe>
                </div>
            )}
        </div>
    );
};

export default MatchCard;
