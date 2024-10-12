import axios from 'axios';
import { NewsItem } from '../models/NewsModel'; // Импортируем модель новостей из models/NewsModel

import logoPlaceholder from '../assets/images/placeholder_3.png';

// Заглушка для изображения
const placeholderImage = '../assets/images/placeholder_3.png'; // Замените на путь к заглушке в вашем проекте

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
            image: logoPlaceholder, // Используем заглушку вместо фото
            title: news.title,
            description: news.text, // Маппим поле text в описание
            date: new Date(news.created_at).toLocaleDateString('ru-RU', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            }), // Форматируем дату
            time: new Date(news.created_at).toLocaleTimeString('ru-RU', {
                hour: '2-digit',
                minute: '2-digit'
            }), // Форматируем время без секунд
            isImportant: false, // Пока все новости не важные
            link: '' // Пустое значение для ссылки
        }));

        return formattedNews;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            // Ошибка Axios
            console.error('Ошибка Axios при получении новостей:', error.response?.data || error.message);
        } else {
            // Неизвестная ошибка
            console.error('Неизвестная ошибка:', error);
        }
        return [];
    }
};
