import React from 'react';
import styles from './ActionButton.module.css';
import logo from '../../assets/images/logo.svg';

interface ActionButtonProps {
    text: string;
    link?: string; // Опциональная ссылка для перехода
    action?: () => void; // Опциональная функция действия
}

const ActionButton: React.FC<ActionButtonProps> = ({ text, link, action }) => {
    const handleClick = () => {
        if (action) {
            action(); // Выполняем переданное действие
        } else if (link) {
            window.open(link, '_blank'); // Переход по ссылке в новом окне
        }
    };

    return (
        <div className={styles.buttonContainer} onClick={handleClick}>
            <div className={styles.text}>{text}</div>
            <img src={logo} alt="logo" className={styles.logo} />
        </div>
    );
};

export default ActionButton;
