import React, { useState, useEffect } from 'react';
import PageTemplate from '../../components/PageTemplate/PageTemplate';
import lines from '../../assets/images/lines.svg';
import { getNews } from '../../api/newsApi'; // Импортируем API для новостей
import styles from './MainPage.module.css';
import MatchCard from '../../modules/MatchCard/MatchCard';
import { getMatches } from '../../api/matchesApi'; // Импорт API для матчей
import NewsEvents from '../../components/NewsAndEvents/NewsAndEvents';
import wLogo from '../../assets/images/white-logo.svg';
import { NewsItem } from '../../models/NewsModel'; // Импорт модели для новостей

const MainPage: React.FC = () => {
    const [matches, setMatches] = useState<any[]>([]);
    const [loadingMatches, setLoadingMatches] = useState(true);
    const [errorMatches, setErrorMatches] = useState<string | null>(null);

    const [news, setNews] = useState<NewsItem[]>([]); // Состояние для новостей
    const [loadingNews, setLoadingNews] = useState(true);
    const [errorNews, setErrorNews] = useState<string | null>(null);

    // Получение матчей
    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const data = await getMatches();
                setMatches(data);
            } catch (err) {
                setErrorMatches('Не удалось загрузить матчи');
            } finally {
                setLoadingMatches(false);
            }
        };

        fetchMatches();
    }, []);

    // Получение новостей
    useEffect(() => {
        const fetchNews = async () => {
            try {
                const fetchedNews = await getNews();
                setNews(fetchedNews);
            } catch (err) {
                setErrorNews('Не удалось загрузить новости');
            } finally {
                setLoadingNews(false);
            }
        };

        fetchNews();
    }, []);

    const pastMatch = matches.find(match => new Date(match.start_time) < new Date());
    const upcomingMatches = matches.filter(match => new Date(match.start_time) >= new Date()).slice(0, 2);

    return (
        <PageTemplate newsItem={news}>
            <div className={styles.conteiner}>
                <div className={styles.redBackground}>
                    <img src={lines} className={styles.backgroundImage} />
                    <div className={styles.headerRow}>
                        <h1 className={styles.title}>МАТЧИ</h1>
                        <button className={styles.moreButton} onClick={() => window.location.href = '/matches'}>
                            ПОДРОБНЕЕ →
                        </button>
                    </div>
                    <div className={styles.subHeader}>
                        <div className={styles.pastContainer}>
                            <span className={styles.pastMatches}>ПРОШЛЫЙ МАТЧ</span>
                            <div className={styles.pastUnderline}></div>
                            <div className={styles.matchBox}>
                                {pastMatch ? (
                                    <MatchCard match={pastMatch} isVertical={true} />
                                ) : (
                                    <p>Мы не нашли прошедших матчей</p>
                                )}
                            </div>
                        </div>
                        <div className={styles.upcomingContainer}>
                            <span className={styles.upcomingMatches}>ПРЕДСТОЯЩИЕ МАТЧИ</span>
                            <div className={styles.upcomingUnderline}></div>
                            <div className={styles.matchBox}>
                                {upcomingMatches.length > 0 ? (
                                    upcomingMatches.map(match => (
                                        <div key={match.start_time} className={styles.matchBox}>
                                            <MatchCard match={match} isVertical={true} />
                                        </div>
                                    ))
                                ) : (
                                    <p>Ждите матчей, они обязательно будут</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.mainContent}>
                    <NewsEvents />
                    <div className={styles.subscriptionContainer}>
                        <img className={styles.miniLogo} src={wLogo} />
                        <p className={styles.subText}>БУДЬ С НАМИ НА СВЯЗИ</p>
                        <div className={styles.inputBlock}>
                            <input
                                type="email"
                                placeholder="ivanov@no.one"
                                className={styles.emailInput}
                            />
                            <button className={styles.submit}>ПОДПИСАТЬСЯ</button>
                        </div>
                    </div>
                </div>

            </div>
        </PageTemplate>
    );
};

export default MainPage;
