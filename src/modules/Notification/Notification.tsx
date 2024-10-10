import React, { useEffect, useState } from 'react';
import styles from './Notification.module.css';

interface NotificationProps {
    message: string;
    onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, onClose }) => {
    const [isClosing, setIsClosing] = useState(false); // Состояние для анимации закрытия

    useEffect(() => {
        // Устанавливаем таймер для автоматического закрытия уведомления через 3 секунды
        const timer = setTimeout(() => {
            setIsClosing(true); // Устанавливаем флаг закрытия
        }, 3000);

        return () => clearTimeout(timer); // Очищаем таймер при размонтировании компонента
    }, []);

    useEffect(() => {
        // Если начато закрытие, запускаем таймер для удаления компонента после завершения анимации
        if (isClosing) {
            const closeTimer = setTimeout(() => {
                onClose();
            }, 300); // Задержка совпадает с длительностью анимации закрытия (0.3s)
            return () => clearTimeout(closeTimer);
        }
    }, [isClosing, onClose]);

    // Рендерим компонент с классом анимации закрытия, если isClosing = true
    return (
        <div className={`${styles.notification} ${isClosing ? styles.slideOut : ''}`}>
            <p>{message}</p>
            <button className={styles.closeButton} onClick={() => setIsClosing(true)}>
                &times;
            </button>
        </div>
    );
};

export default Notification;
