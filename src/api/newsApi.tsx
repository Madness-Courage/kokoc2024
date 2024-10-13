import axios from 'axios';
import { NewsItem } from '../models/NewsModel'; // Импорт модели новостей
import placeholder1 from '../assets/images/placeholder.jpg';
import placeholder2 from '../assets/images/placeholder_2.jpg';
import placeholder3 from '../assets/images/placeholder_3.png';

// Заглушки для изображений
const placeholders = [placeholder1, placeholder2, placeholder3];

// Функция для получения списка новостей
export const getNews = async (): Promise<NewsItem[]> => {
    try {
        const response = await axios.get('http://192.168.1.66:3002/api/news', {
            params: {
                limit: 10, // Ограничение количества новостей
            }
        });
        const newsData = response.data;

        // Преобразуем данные с сервера в структуру NewsItem[]
        const formattedNews: NewsItem[] = newsData.map((news: any) => ({
            id: news.id,
            image: news.image || placeholders[Math.floor(Math.random() * placeholders.length)], // Случайная картинка
            title: news.title,
            description: news.text, // Поле text маппим в описание
            date: new Date(news.created_at).toLocaleDateString('ru-RU', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            }),
            time: new Date(news.created_at).toLocaleTimeString('ru-RU', {
                hour: '2-digit',
                minute: '2-digit'
            }),
            isImportant: false, // Временно все новости не важные
            link: '' // Пустое значение для ссылки
        }));

        return formattedNews;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            console.error('Ошибка Axios при получении новостей:', error.response?.data || error.message);
        } else {
            console.error('Неизвестная ошибка:', error);
        }
        return [];
    }
};
