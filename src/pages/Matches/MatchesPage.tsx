import React, { useState, useEffect, useRef } from 'react';
import PageTemplate from '../../components/PageTemplate/PageTemplate';
import placeholder from '../../assets/images/placeholder_3.png';
import styles from './MatchesPage.module.css';
import MatchCard from '../../modules/MatchCard/MatchCard';
import { Match } from '../../models/MatchModel';
import placeholderLogo from '../../assets/images/placeholder_3.png';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale'; // Импорт русского локаля для форматирования дат

// Пример матчей
const matches: Match[] = [
    {
        date: '2024-10-12',
        time: '18:10',
        place: 'Вернадка Парк',
        opponentName: 'БАВАРИЯ',
        opponentLogo: placeholderLogo,
        registerLink: '#',
        airUrl: 'https://vk.com/video_ext.php?oid=-41903770&id=456248205&hd=1&autoplay=1',
        isActive: true,
    },
    {
        date: '2024-09-25',
        time: '16:00',
        place: 'Стадион Спартак',
        opponentName: 'СПАРТАК',
        opponentLogo: placeholderLogo,
        registerLink: '#',
    },
    {
        date: '2024-9-11',
        time: '18:10',
        place: 'Вернадка Парк',
        opponentName: 'БАВАРИЯ',
        opponentLogo: placeholderLogo,
        registerLink: '#',
    },
    {
        date: '2024-11-12',
        time: '19:30',
        place: 'Красная площадь',
        opponentName: 'СПАРТАК',
        opponentLogo: placeholderLogo,
        registerLink: '#',
    },
    {
        date: '1912-10-12',
        time: '20:00',
        place: 'Лужники',
        opponentName: 'ДИНАМО',
        opponentLogo: placeholderLogo,
        registerLink: '#',
    },
    // Добавьте больше матчей для теста
];

const MainPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
    const [underlineStyle, setUnderlineStyle] = useState<{ width: string, left: string }>({ width: '0px', left: '0px' });
    const upcomingTabRef = useRef<HTMLButtonElement | null>(null);
    const pastTabRef = useRef<HTMLButtonElement | null>(null);

    // Сортировка матчей по дате
    const sortedMatches = [...matches].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // Группировка прошедших матчей по месяцам
    const pastMatchesGroupedByMonth = sortedMatches.reduce<{ [key: string]: Match[] }>((acc, match) => {
        const matchDate = new Date(match.date);
        if (matchDate < new Date()) {
            const monthKey = format(matchDate, 'LLLL yyyy', { locale: ru }); // Формат: Месяц Год
            if (!acc[monthKey]) {
                acc[monthKey] = [];
            }
            acc[monthKey].push(match);
        }
        return acc;
    }, {});

    useEffect(() => {
        // Обновляем положение и ширину красной полоски в зависимости от активной вкладки
        const activeTabRef = activeTab === 'upcoming' ? upcomingTabRef.current : pastTabRef.current;

        if (activeTabRef) {
            const { offsetWidth, offsetLeft } = activeTabRef;
            setUnderlineStyle({
                width: `${offsetWidth}px`,
                left: `${offsetLeft}px`
            });
        }
    }, [activeTab]);

    return (
        <PageTemplate backgroundImages={[placeholder]}>
            <div className={styles.matchContainer}>
                <div className={styles.container}>
                    {/* Заголовок */}
                    <h1 className={styles.title}>МАТЧИ</h1>

                    {/* Кнопки */}
                    <div className={styles.tabs}>
                        <button
                            ref={upcomingTabRef}
                            className={`${styles.tabButton} ${activeTab === 'upcoming' ? styles.active : ''}`}
                            onClick={() => setActiveTab('upcoming')}
                        >
                            ПРЕДСТОЯЩИЕ
                        </button>
                        <button
                            ref={pastTabRef}
                            className={`${styles.tabButton} ${activeTab === 'past' ? styles.active : ''}`}
                            onClick={() => setActiveTab('past')}
                        >
                            ПРОШЕДШИЕ
                        </button>
                    </div>

                    {/* Красная черточка под активной кнопкой */}
                    <div
                        className={styles.underline}
                        style={{ width: underlineStyle.width, left: underlineStyle.left }}
                    ></div>

                    {/* Содержимое */}
                    <div className={styles.content}>
                        {activeTab === 'upcoming' ? (
                            sortedMatches.filter(match => new Date(match.date) >= new Date()).map((match, index) => (
                                <div key={index}>
                                    <div className={styles.divider}></div>
                                    <MatchCard key={match.date} match={match} />
                                    <div className={styles.divider}></div>
                                </div>
                            ))
                        ) : (
                            Object.entries(pastMatchesGroupedByMonth).map(([month, matches]) => (
                                <div key={month}>
                                    <h2 className={styles.monthTitle}>
                                        {month.charAt(0).toUpperCase() + month.slice(1)}
                                    </h2>
                                    <div className={styles.divider}></div>
                                    {matches.map((match) => (
                                        <div key={match.date} className={styles.matchItem}>
                                            <MatchCard match={match} />
                                            <div className={styles.divider}></div>
                                        </div>
                                    ))}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </PageTemplate>
    );
}

export default MainPage;
