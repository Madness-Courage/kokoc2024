import { useState, useEffect } from 'react';
import { NewsItem } from '../models/NewsModel';
import { getNews } from '../api/newsApi'; // Импорт функции API

const useLatestNews = () => {
    const [newsItems, setNewsItems] = useState<NewsItem[]>([]);

    useEffect(() => {
        const fetchNews = async () => {
            const latestNews = await getNews();
            setNewsItems(latestNews.slice(0, 3)); // Берем только три последние новости
        };

        fetchNews();
    }, []);

    return newsItems;
};

export default useLatestNews;
