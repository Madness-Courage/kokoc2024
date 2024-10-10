import React from 'react';
import styles from './Footer.module.css';
import whiteLogo from '../../assets/images/white-logo.svg'; // Замените на путь к вашему логотипу
import { ReactComponent as VkIcon } from '../../assets/icons/vk.svg'; // Иконка VK
import { ReactComponent as TelegramIcon } from '../../assets/icons/tg.svg'; // Иконка Telegram

const Footer: React.FC = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                {/* Логотип и описание */}
                <div className={styles.logoSection}>
                    <img src={whiteLogo} alt="Кокос групп" className={styles.logo} />
                    <p className={styles.description}>
                        Официальный сайт Футбольного клуба «Кокос групп»
                    </p>
                </div>

                {/* Ссылки и текстовые блоки */}
                <div className={styles.linksSection}>
                    {/* Первый столбец */}
                    <div className={styles.linkColumn}>
                        <a href="#" className={styles.link}>Новости</a>
                        <a href="#" className={styles.link}>Матчи</a>
                        <a href="#" className={styles.link}>Команда</a>
                    </div>

                    {/* Второй столбец */}
                    <div className={styles.linkColumn}>
                        <a href="#" className={styles.link}>Билеты</a>
                        <a href="#" className={styles.link}>Клуб</a>
                        <a href="#" className={styles.link}>Магазин</a>
                    </div>

                    {/* Третий столбец */}
                    <div className={styles.textColumn}>
                        <p className={styles.columnTitle}>Адрес:</p>
                        <p className={styles.columnText}>xxx</p>
                    </div>

                    {/* Четвертый столбец */}
                    <div className={styles.textColumn}>
                        <p className={styles.columnTitle}>Телефон:</p>
                        <p className={styles.columnText}>xxx</p>
                    </div>
                </div>

                {/* Иконки социальных сетей */}
                <div className={styles.socialIcons}>
                    <VkIcon className={styles.icon} />
                    <TelegramIcon className={styles.icon} />
                </div>
            </div>
        </footer>
    );
};

export default Footer;
