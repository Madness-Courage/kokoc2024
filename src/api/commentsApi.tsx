import axios from 'axios';

// URL для комментариев
const BASE_URL = 'http://192.168.1.66:3002/api/comments';

// Получение комментариев по news_id
export const getComments = async (newsId: number) => {
    try {
        const response = await axios.get(`${BASE_URL}?news_id=${newsId}`);
        return response.data;
    } catch (error) {
        console.error('Ошибка при получении комментариев:', error);
        return [];
    }
};

// Добавление комментария
export const addComment = async (newsId: number, text: string, token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiSXZhbjIyOCIsImFkbWluIjp0cnVlLCJpYXQiOjE3Mjg3NjMxNzYsImV4cCI6MTcyODc2NDA3Nn0.t7jS_jPEfZhnA-H3UV8b_7Fw6uIc1hVUq5imQ4YR5JA') => {
    try {
        const response = await axios.post(
            BASE_URL,
            { news_id: newsId, text },
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Вставляем Bearer токен
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Ошибка при добавлении комментария:', error);
        throw error;
    }
};
