import React, { useEffect } from 'react';
import styles from './NewsModal.module.css';
import { NewsItem } from '../../models/NewsModel';
import { ReactComponent as CloseIcon } from '../../assets/icons/menu.svg';
import ReactMarkdown from 'react-markdown';

interface NewsModalProps {
    isOpen: boolean;
    onClose: () => void;
    newsItem: NewsItem | null;
}

const NewsModal: React.FC<NewsModalProps> = ({ isOpen, onClose, newsItem }) => {
    // Закрытие модального окна при клике вне контента
    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    // Закрытие модального окна при нажатии клавиши Escape
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
            // При размонтировании компонента возвращаем стандартное поведение
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

                {/* Картинка новости */}
                <div className={styles.imageContainer}>
                    <img src={newsItem.image} alt={newsItem.title} className={styles.newsImage} />
                </div>

                {/* Заголовок новости */}
                <h2 className={styles.newsTitle}>{newsItem.title}</h2>

                {/* Описание новости с поддержкой Markdown */}
                <div className={styles.newsDescription}>
                    <ReactMarkdown>{newsItem.description}</ReactMarkdown>
                </div>
            </div>
        </div>
    );
};

export default NewsModal;
