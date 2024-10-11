import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './BackgroundTextOverlay.module.css';
import { ReactComponent as BackIcon } from '../../../assets/icons/back.svg'; // Импорт иконки для кнопки

interface BackgroundTextOverlayProps {
    title: string; // Название текущей страницы
    isMain: boolean;
}

const BackgroundTextOverlay: React.FC<BackgroundTextOverlayProps> = ({ title , isMain = false}) => {
    const navigate = useNavigate();

    // Функция для перехода на главную страницу
    const handleBackToHome = () => {
        navigate('/');
    };

    return (
        <>
            {isMain &&
            <div className={styles.overlayContainer}>
                <button className={styles.backButton} onClick={handleBackToHome}>
                    <BackIcon className={styles.backIcon}/>
                    На главную
                </button>
                <h1 className={styles.title}>{title}</h1>
            </div>
            }
            {!isMain &&
                <div className={styles.overlayContainer2}>
                    <button className={styles.backButton} onClick={() => navigate('/news')}>
                        <h1 className={styles.title}>{title}</h1>
                    </button>
                </div>

}
</>
)
    ;
};

export default BackgroundTextOverlay;
