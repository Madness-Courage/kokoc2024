import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './NewsTab.module.css';
import { NewsItem } from '../../models/NewsModel';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiSXZhbjIyOCIsImFkbWluIjp0cnVlLCJpYXQiOjE3Mjg4NTc5MTMsImV4cCI6MTcyODg2MzMxM30.qLM2sXabdJE6q3GrqRY3LGiT0Qn3meNakKtFPdrLAeE'

const NewsTab = () => {
    const [newsList, setNewsList] = useState<NewsItem[]>([]);

    const fetchNews = async () => {
        try {
            const response = await axios.get('http://192.168.1.66:3001/api/admin/news', {
                headers: {
                    Authorization: `Bearer ${token}` // Добавляем токен в заголовок
                }
            });

            console.log(response.data);
            setNewsList(response.data);
        } catch (error) {
            console.error('Ошибка при загрузке новостей:', error);
        }
    };

    useEffect(() => {
        fetchNews();
    }, []);

    return (
        <div className={styles.newsTab}>
            <h2>Новости</h2>
            <ul className={styles.newsList}>
                {newsList.map((news) => (
                    <li key={news.id} className={styles.newsItem}>
                        <h3>{news.title}</h3>
                        <p>{news.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NewsTab;
