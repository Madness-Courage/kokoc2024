import React, { useState, useEffect, useRef } from 'react';
import PageTemplate from '../../components/PageTemplate/PageTemplate';
import placeholder from '../../assets/images/placeholder_3.png';
import styles from './MatchesPage.module.css';
import MatchCard from '../../modules/MatchCard/MatchCard';
import { getMatches } from '../../api/matchesApi'; // API for fetching matches
import { Match } from '../../models/MatchModel';

const MainPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
    const [matches, setMatches] = useState<Match[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [underlineStyle, setUnderlineStyle] = useState<{ width: string, left: string }>({ width: '0px', left: '0px' });
    const upcomingTabRef = useRef<HTMLButtonElement | null>(null);
    const pastTabRef = useRef<HTMLButtonElement | null>(null);

    // Fetch matches on component mount
    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const data = await getMatches();
                setMatches(data);
            } catch (err) {
                setError('Failed to load matches.');
            } finally {
                setLoading(false);
            }
        };

        fetchMatches();
    }, []);

    // Update underline position based on active tab
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

    const currentDate = new Date();

    // Filter past and upcoming matches based on start_time
    const sortedMatches = matches.sort((a, b) => new Date(b.start_time).getTime() - new Date(a.start_time).getTime());

    const pastMatchesGroupedByMonth = sortedMatches.reduce<{ [key: string]: Match[] }>((acc, match) => {
        const matchDate = new Date(match.start_time);
        if (matchDate < currentDate && !match.isActive) {
            const monthKey = new Intl.DateTimeFormat('ru-RU', { month: 'long', year: 'numeric' }).format(matchDate);
            if (!acc[monthKey]) {
                acc[monthKey] = [];
            }
            acc[monthKey].push(match);
        }
        return acc;
    }, {});

    const upcomingMatches = sortedMatches.filter(
        match => new Date(match.start_time) >= currentDate || match.isActive
    );

    return (
        <PageTemplate backgroundImages={[placeholder]}>
            <div className={styles.matchContainer}>
                <div className={styles.container}>
                    <h1 className={styles.title}>МАТЧИ</h1>
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
                    <div className={styles.underline} style={{ width: underlineStyle.width, left: underlineStyle.left }}></div>

                    <div className={styles.content}>
                        {loading ? (
                            <div className={styles.loader}><div className={styles.spinner}></div></div>
                        ) : error ? (
                            <p className={styles.errorMessage}>Звонил сервер, сказал что отправил данные почтовым голубем. Голубя зовут Олег.</p>
                        ) : activeTab === 'upcoming' ? (
                            upcomingMatches.length > 0 ? (
                                upcomingMatches.map((match, index) => (
                                    <MatchCard key={index} match={match} />
                                ))
                            ) : (
                                <p className={styles.noMatchesMessage}>В обозримом будущем матчей нет, по карйней мере сайту об этом не сказали(</p>
                            )
                        ) : (
                            Object.keys(pastMatchesGroupedByMonth).length > 0 ? (
                                Object.entries(pastMatchesGroupedByMonth).map(([month, matches]) => (
                                    <div key={month}>
                                        <h2 className={styles.monthTitle}>{month}</h2>
                                        {matches.map((match, index) => (
                                            <MatchCard key={index} match={match} />
                                        ))}
                                    </div>
                                ))
                            ) : (
                                <p className={styles.noMatchesMessage}>Мы не смогли вспомнить ни один матч. Как хорошо, что наши администраторы совсем скоро нам напомнят!</p>
                            )
                        )}
                    </div>
                </div>
            </div>
        </PageTemplate>
    );
};

export default MainPage;
