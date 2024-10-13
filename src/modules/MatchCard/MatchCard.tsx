import React, { useEffect, useState } from 'react';
import styles from './MatchCard.module.css';
import { Match } from '../../models/MatchModel';
import { format } from 'date-fns';

interface MatchCardProps {
    match: Match; // Пропс, принимающий данные типа Match
    isVertical?: boolean; // Пропс для переключения вертикального режима
}

const MatchCard: React.FC<MatchCardProps> = ({ match, isVertical = false }) => {
    const matchDate = new Date(match.start_time);
    const formattedDate = format(matchDate, 'dd.MM');
    const isPastMatch = matchDate < new Date();
    console.log(new Date());
    console.log(matchDate);

    const [iframeDimensions, setIframeDimensions] = useState({ width: 640, height: 360 });

    useEffect(() => {
        const updateIframeDimensions = () => {
            const width = window.innerWidth * 0.6; // Ширина 60% от экрана пользователя
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
        <div className={`${styles.matchCard} ${isVertical ? styles.vertical : ''}`}>
            <div className={styles.matchDetails}>
                <p className={styles.date}><strong>{formattedDate}</strong></p>
                <p className={styles.time}>{format(matchDate, 'HH:mm')}</p>
                <p className={styles.place}>{match.stadium}</p>
            </div>

            <div className={styles.teams}>
                <div className={styles.team}>
                    <img src={match.team1_logo_url} alt={`${match.team1} Logo`} className={styles.logo} />
                    <p className={styles.teamName}>{match.team1}</p>
                </div>
                {isPastMatch && !match.isActive ? (
                    <p className={styles.score}>{match.team1_goals}:{match.team2_goals}</p>
                ) : (
                    <p className={styles.vs}>VS</p>
                )}
                <div className={styles.team}>
                    <img src={match.team2_logo_url} alt={`${match.team2} Logo`} className={styles.logo} />
                    <p className={styles.teamName}>{match.team2}</p>
                </div>
            </div>

            {match.isActive && match.stream_url ? (
                <div className={styles.registration}>
                    <a href={match.stream_url} className={styles.registerButton}>
                        СМОТРЕТЬ ТРАНСЛЯЦИЮ →
                    </a>
                </div>
            ) : (
                <div className={styles.registration}>
                    <a href={match.registration_form_url} className={styles.registerButton}>
                        ЗАРЕГИСТРИРОВАТЬСЯ →
                    </a>
                </div>
            )}
        </div>
    );
};

export default MatchCard;
