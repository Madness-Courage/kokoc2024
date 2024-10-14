import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import styles from './NewsTab.module.css';

import axios from 'axios';
import { NewsItem } from '../../models/NewsModel';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiSXZhbjIyOCIsImFkbWluIjp0cnVlLCJpYXQiOjE3Mjg5MzE4OTQsImV4cCI6MTcyODkzNzI5NH0.uwnMouxAcPT3-PwNVl9FMq0zEw3Tsdyoc6fBSMCT7jk'; // Замените на реальный JWT-токен

// Конвертирует данные, полученные с сервера, в формат NewsItem
const convertApiResponseToNewsItem = (apiResponse: any): NewsItem => {
    return {
        id: apiResponse.id,
        image: apiResponse.photo || 'placeholder.jpg', // Если нет изображения, используем заглушку
        title: apiResponse.title,
        description: apiResponse.text,
        date: new Date(apiResponse.created_at).toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }),
        time: new Date(apiResponse.created_at).toLocaleTimeString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit'
        }),
        isImportant: apiResponse.is_important,
        link: '' // Пустое значение для ссылки
    };
};

// Конвертирует NewsItem в формат, необходимый для отправки на сервер
const convertNewsItemToApiRequest = (newsItem: NewsItem): any => {
    // Проверяем, что у нас есть корректные дата и время для создания объекта Date
    const [day, month, year] = newsItem.date.split('.').map(Number);
    const [hours, minutes] = newsItem.time.split(':').map(Number);

    // Создаём корректный объект Date
    const date = new Date(year, month - 1, day, hours, minutes); // В JavaScript месяцы начинаются с 0

    return {
        photo: newsItem.image,
        title: newsItem.title,
        text: newsItem.description,
        author: 'Admin', // Используйте соответствующее имя автора
        is_important: newsItem.isImportant,
    };
};



// Получение списка новостей
const getNews = async (): Promise<NewsItem[]> => {
    try {
        const response = await axios.get('http://192.168.1.66:3001/api/admin/news', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const newsData = response.data;

        // Преобразуем данные с сервера в структуру NewsItem[]
        const formattedNews: NewsItem[] = newsData.map((news: any) => convertApiResponseToNewsItem(news));
        return formattedNews;
    } catch (error) {
        console.error('Ошибка при получении новостей:', error);
        return [];
    }
};

// Добавление новой новости
const addNews = async (newsItem: Omit<NewsItem, 'id'>): Promise<NewsItem> => {
    try {
        const newsToSend = convertNewsItemToApiRequest({ ...newsItem, id: 123 }); // Для новой новости id = 0
        console.log(newsToSend);
        const response = await axios.post('http://192.168.1.66:3001/api/admin/news/add-news', newsToSend, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        // Преобразуем ответ в формат NewsItem
        return convertApiResponseToNewsItem(response.data);
    } catch (error) {
        console.error('Ошибка при добавлении новости:', error);
        throw error;
    }
}

// Обновление существующей новости
const updateNews = async (id: number, updatedNewsItem: NewsItem): Promise<NewsItem> => {
    try {
        const newsToSend = convertNewsItemToApiRequest(updatedNewsItem);
        const response = await axios.put(`http://192.168.1.66:3001/api/admin/news/${id}`, newsToSend, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        // Преобразуем ответ в формат NewsItem
        return convertApiResponseToNewsItem(response.data);
    } catch (error) {
        console.error('Ошибка при обновлении новости:', error);
        throw error;
    }
};

// Удаление новости
const deleteNews = async (id: number): Promise<void> => {
    try {
        await axios.delete(`http://192.168.1.66:3001/api/admin/news/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    } catch (error) {
        console.error('Ошибка при удалении новости:', error);
        throw error;
    }
};


const NewsTab = () => {
    const [newsList, setNewsList] = useState<NewsItem[]>([]);
    const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
    const [newNews, setNewNews] = useState<Omit<NewsItem, 'id'>>({
        image: '',
        title: '',
        description: '',
        date: '',
        time: '',
        link: '',
        isImportant: false,
    });

    const [markdownText, setMarkdownText] = useState(''); // Поле для редактирования описания через Markdown

    const fetchNews = async () => {
        try {
            const news = await getNews();
            setNewsList(news);
        } catch (error) {
            console.error('Ошибка при получении новостей:', error);
        }
    };

    const handleAddNews = async () => {
        try {
            const addedNews = await addNews(newNews);
            setNewsList([...newsList, addedNews]);
            setNewNews({
                image: '',
                title: '',
                description: '',
                date: '',
                time: '',
                link: '',
                isImportant: false,
            });
        } catch (error) {
            console.error('Ошибка при добавлении новости:', error);
        }
    };

    const handleUpdateNews = async () => {
        if (!editingNews) return;
        try {
            const updatedNews = await updateNews(editingNews.id, editingNews);
            setNewsList(newsList.map(news => (news.id === editingNews.id ? updatedNews : news)));
            setEditingNews(null);
        } catch (error) {
            console.error('Ошибка при обновлении новости:', error);
        }
    };

    const handleDeleteNews = async (id: number) => {
        try {
            await deleteNews(id);
            setNewsList(newsList.filter(news => news.id !== id));
        } catch (error) {
            console.error('Ошибка при удалении новости:', error);
        }
    };

    const startEditing = (news: NewsItem) => {
        setEditingNews(news);
        setMarkdownText(news.description);
    };

    const handleMarkdownChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const updatedDescription = e.target.value;
        if (editingNews) {
            setEditingNews({ ...editingNews, description: updatedDescription });
        } else {
            setNewNews({ ...newNews, description: updatedDescription });
        }
        setMarkdownText(updatedDescription);
    };

    useEffect(() => {
        fetchNews();
    }, []);

    return (
        <div className={styles.newsTab}>
            <h2>Новости</h2>

            <div className={styles.inputGroup}>
                <input
                    type="text"
                    value={newNews.title}
                    onChange={(e) => setNewNews({ ...newNews, title: e.target.value })}
                    placeholder="Заголовок"
                />
                <input
                    type="text"
                    value={newNews.image}
                    onChange={(e) => setNewNews({ ...newNews, image: e.target.value })}
                    placeholder="URL изображения"
                />
                <input
                    type="text"
                    value={newNews.date}
                    onChange={(e) => setNewNews({ ...newNews, date: e.target.value })}
                    placeholder="Дата"
                />
                <input
                    type="text"
                    value={newNews.time}
                    onChange={(e) => setNewNews({ ...newNews, time: e.target.value })}
                    placeholder="Время"
                />
                <textarea
                    placeholder="Описание (Markdown поддерживается)"
                    value={markdownText}
                    onChange={handleMarkdownChange}
                    className={styles.markdownEditor}
                />
                <div className={styles.checkboxGroup}>
                    <label>
                        <input
                            type="checkbox"
                            checked={newNews.isImportant}
                            onChange={(e) => setNewNews({ ...newNews, isImportant: e.target.checked })}
                        />
                        Важная новость
                    </label>
                </div>
                <button onClick={handleAddNews} className={styles.addButton}>
                    Добавить новость
                </button>
            </div>

            <h3>Список новостей</h3>
            <ul className={styles.newsList}>
                {newsList.map((news) => (
                    <li key={news.id} className={styles.newsItem}>
                        <h4>{news.title}</h4>
                        <p><strong>Дата:</strong> {news.date} {news.time}</p>
                        <div className={styles.newsContent}>
                            <ReactMarkdown>{news.description}</ReactMarkdown>
                        </div>
                        <div className={styles.actions}>
                            <button onClick={() => startEditing(news)} className={styles.editButton}>
                                Редактировать
                            </button>
                            <button onClick={() => handleDeleteNews(news.id)} className={styles.deleteButton}>
                                Удалить
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            {editingNews && (
                <div className={styles.editSection}>
                    <h3>Редактирование новости</h3>
                    <div className={styles.inputGroup}>
                        <input
                            type="text"
                            value={editingNews.title}
                            onChange={(e) => setEditingNews({ ...editingNews, title: e.target.value })}
                            placeholder="Заголовок"
                        />
                        <input
                            type="text"
                            value={editingNews.image}
                            onChange={(e) => setEditingNews({ ...editingNews, image: e.target.value })}
                            placeholder="URL изображения"
                        />
                        <input
                            type="text"
                            value={editingNews.date}
                            onChange={(e) => setEditingNews({ ...editingNews, date: e.target.value })}
                            placeholder="Дата"
                        />
                        <input
                            type="text"
                            value={editingNews.time}
                            onChange={(e) => setEditingNews({ ...editingNews, time: e.target.value })}
                            placeholder="Время"
                        />
                        <textarea
                            placeholder="Описание (Markdown поддерживается)"
                            value={markdownText}
                            onChange={handleMarkdownChange}
                            className={styles.markdownEditor}
                        />
                        <div className={styles.checkboxGroup}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={editingNews.isImportant}
                                    onChange={(e) => setEditingNews({ ...editingNews, isImportant: e.target.checked })}
                                />
                                Важная новость
                            </label>
                        </div>
                        <button onClick={handleUpdateNews} className={styles.updateButton}>
                            Обновить новость
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NewsTab;
