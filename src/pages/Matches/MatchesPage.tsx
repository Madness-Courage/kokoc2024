import React, { useState, useEffect, useRef } from 'react';
import PageTemplate from '../../components/PageTemplate/PageTemplate';
import placeholder from '../../assets/images/placeholder_3.png';
import styles from './MatchesPage.module.css';
import MatchCard from '../../modules/MatchCard/MatchCard';
import { getMatches } from '../../api/matchesApi'; // Импорт функции API
import { Match } from '../../models/MatchModel';

const MainPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
    const [matches, setMatches] = useState<Match[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [underlineStyle, setUnderlineStyle] = useState<{ width: string, left: string }>({ width: '0px', left: '0px' });
    const upcomingTabRef = useRef<HTMLButtonElement | null>(null);
    const pastTabRef = useRef<HTMLButtonElement | null>(null);

    // Функция для получения данных матчей
    const fetchMatches = async () => {
        try {
            const data = await getMatches();
            setMatches(data);
        } catch (err) {
            setError('Я не смог вам загрузить матчи, потому что сервер не отвечает на телефонные звонки, поэтому я послал голубя.');
        } finally {
            setLoading(false);
        }
    };

    // Получаем матчи при монтировании компонента
    useEffect(() => {
        fetchMatches();
    }, []);

    // Обновляем положение и ширину красной полоски в зависимости от активной вкладки
    useEffect(() => {
        const activeTabRef = activeTab === 'upcoming' ? upcomingTabRef.current : pastTabRef.current;

        if (activeTabRef) {
            const { offsetWidth, offsetLeft } = activeTabRef;
            setUnderlineStyle({
                width: `${offsetWidth}px`,
                left: `${offsetLeft}px`
            });
        }
    }, [activeTab]);

    // Сортировка матчей по дате
    const sortedMatches = [...matches].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // Группировка прошедших матчей по месяцам
    const pastMatchesGroupedByMonth = sortedMatches.reduce<{ [key: string]: Match[] }>((acc, match) => {
        const matchDate = new Date(match.date);
        if (matchDate < new Date()) {
            const monthKey = new Intl.DateTimeFormat('ru-RU', { month: 'long', year: 'numeric' }).format(matchDate);
            if (!acc[monthKey]) {
                acc[monthKey] = [];
            }
            acc[monthKey].push(match);
        }
        return acc;
    }, {});

    // Фильтрация предстоящих матчей
    const upcomingMatches = sortedMatches.filter(match => new Date(match.date) >= new Date());

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

                    {/* Содержимое вкладок */}
                    <div className={styles.content}>
                        {loading ? (
                            <div className={styles.loader}>
                                <div className={styles.spinner}></div>
                            </div>
                        ) : error ? (
                            <p className={styles.errorMessage}>{error}</p>
                        ) : activeTab === 'upcoming' ? (
                            upcomingMatches.length > 0 ? (
                                upcomingMatches.map((match) => (
                                    <MatchCard key={match.date} match={match} />
                                ))
                            ) : (
                                <p className={styles.noMatchesMessage}>
                                    В обозримом будущем матчей нет, по крайней мере, сайту об этом не сказали(
                                </p>
                            )
                        ) : (
                            Object.keys(pastMatchesGroupedByMonth).length > 0 ? (
                                Object.entries(pastMatchesGroupedByMonth).map(([month, matches]) => (
                                    <div key={month}>
                                        <h2 className={styles.monthTitle}>
                                            {month.charAt(0).toUpperCase() + month.slice(1)}
                                        </h2>
                                        {matches.map((match) => (
                                            <MatchCard key={match.date} match={match} />
                                        ))}
                                    </div>
                                ))
                            ) : (
                                <p className={styles.noMatchesMessage}>
                                    Мы не смогли вспомнить ни один матч, как хорошо, что наши администраторы совсем скоро нам напомнят.
                                </p>
                            )
                        )}
                    </div>
                </div>
            </div>
        </PageTemplate>
    );
};

export default MainPage;
