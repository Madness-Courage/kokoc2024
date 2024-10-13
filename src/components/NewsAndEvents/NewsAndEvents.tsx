import React from 'react';
import styles from './NewsAndEvents.module.css';
import lines from '../../assets/images/lines.svg';
import matchesImage from '../../assets/images/placeholder_3.png';
import interviewImage from '../../assets/images/placeholder_3.png';
import pressReleasesImage from '../../assets/images/placeholder_3.png';
import teamImage from '../../assets/images/placeholder.jpg';

const NewsAndEvents: React.FC = () => {
    return (
        <div className={styles.container}>
            <div className={styles.headerRow}>
                <h1 className={styles.title}>НОВОСТИ И СОБЫТИЯ</h1>
                <button className={styles.moreButton} onClick={() => window.location.href = '/news'}>
                    ПОДРОБНЕЕ →
                </button>
            </div>
                <div className={styles.row1}>
                    <div className={`${styles.gridItem} ${styles.expanded}`} onClick={() => window.location.href = '/matches'}>
                        <img src={matchesImage} alt="Матчи" className={styles.gridImage} />
                        <span className={styles.gridText}>МАТЧИ</span>
                    </div>
                    <div className={styles.gridItem} onClick={() => window.location.href = '/interviews'}>
                        <img src={interviewImage} alt="Интервью" className={styles.gridImage} />
                        <span className={styles.gridText}>ИНТЕРВЬЮ</span>
                    </div>
                </div>
                <div className={styles.row2}>
                    <div className={styles.gridItem} onClick={() => window.location.href = '/press-releases'}>
                        <img src={pressReleasesImage} alt="Пресс-релизы" className={styles.gridImage} />
                        <span className={styles.gridText}>ПРЕСС-РЕЛИЗЫ</span>
                    </div>
                    <div className={`${styles.gridItem} ${styles.expanded}`} onClick={() => window.location.href = '/team'}>
                        <img src={teamImage} alt="Команда" className={styles.gridImage} />
                        <span className={styles.gridText}>КОМАНДА</span>
                    </div>
                </div>
        </div>
    );
};

export default NewsAndEvents;
