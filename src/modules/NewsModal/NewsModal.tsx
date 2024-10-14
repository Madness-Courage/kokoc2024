import React, { useEffect, useState } from 'react';
import styles from './NewsModal.module.css';
import { NewsItem } from '../../models/NewsModel';
import { ReactComponent as CloseIcon } from '../../assets/icons/menu.svg';
import ReactMarkdown from 'react-markdown';
import CommentsSection from '../CommentsModal/CommentsSection';

import avatarPlaceholder from '../../assets/images/placeholder_3.png';
import { getComments, addComment } from '../../api/commentsApi'; // Импортируем функции для работы с API

interface NewsModalProps {
    isOpen: boolean;
    onClose: () => void;
    newsItem: NewsItem | null;
}

interface Comment {
    id: number;
    author: string;
    text: string;
    created_at: string;
}

const NewsModal: React.FC<NewsModalProps> = ({ isOpen, onClose, newsItem }) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [commentText, setCommentText] = useState('');
    const isAuthenticated = true; // Поставьте значение true, если пользователь авторизован

    // Загрузка комментариев при открытии модального окна
    useEffect(() => {
        if (isOpen && newsItem) {
            setLoading(true);
            getComments(newsItem.id)
                .then((data) => {
                    setComments(data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error('Ошибка загрузки комментариев:', err);
                    setError('Не удалось загрузить комментарии.');
                    setLoading(false);
                });
        }
    }, [isOpen, newsItem]);

    // Обработчик отправки комментария
    const handleAddComment = () => {
        if (!newsItem || !commentText.trim()) return;

        addComment(newsItem.id, commentText)
            .then(() => {
                setCommentText(''); // Очищаем поле ввода после отправки
                return getComments(newsItem.id); // Запрашиваем заново список комментариев
            })
            .then((updatedComments) => {
                setComments(updatedComments); // Обновляем список комментариев
            })
            .catch((err) => {
                console.error('Ошибка добавления комментария:', err);
                setError('Не удалось добавить комментарий.');
            });
    };


    // Закрытие модального окна при клике вне контента
    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    useEffect(() => {
        const handleEscapeKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEscapeKey);
        return () => window.removeEventListener('keydown', handleEscapeKey);
    }, [onClose]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'; // Отключаем прокрутку
        } else {
            document.body.style.overflow = 'auto'; // Включаем прокрутку
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    if (!isOpen || !newsItem) return null;

    return (
        <div className={styles.modalOverlay} onClick={handleOverlayClick}>
            <div className={styles.modalContent}>
                {/* Кнопка закрытия */}
                <button className={styles.closeButton} onClick={onClose}>
                    <CloseIcon className={styles.closeIcon} />
                </button>

                {/* Заголовок новости */}
                <h1 className={styles.newsTitle}>{newsItem.title}</h1>

                {/* Картинка новости */}
                <div className={styles.imageContainer}>
                    <img src={newsItem.image} alt={newsItem.title} className={styles.newsImage} />
                </div>

                {/* Описание новости */}
                <div className={styles.newsDescription}>
                    <ReactMarkdown>{newsItem.description}</ReactMarkdown>
                </div>

                {/* Блок комментариев */}
                <div className={styles.commentsSection}>
                    {loading ? (
                        <p>Загрузка комментариев...</p>
                    ) : error ? (
                        <p>{error}</p>
                    ) : (
                        <CommentsSection
                            comments={comments}
                            isAuthenticated={isAuthenticated}
                            onCommentTextChange={setCommentText}
                            onCommentSubmit={handleAddComment}
                            commentText={commentText}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default NewsModal;
