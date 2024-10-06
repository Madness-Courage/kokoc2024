import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.css';
import { ReactComponent as SearchIcon } from '../../assets/icons/search.svg';
import { ReactComponent as ProfileIcon } from '../../assets/icons/account.svg';
import { ReactComponent as CartIcon } from '../../assets/icons/cart.svg';
import { ReactComponent as MenuIcon } from '../../assets/icons/menu.svg';
import logo from '../../assets/images/logo.svg';
import { navigationItems } from '../../config/navigation';

const NavBar: React.FC = () => {
    useEffect(() => {
        // Устанавливаем значения по умолчанию для CSS-переменных
        document.documentElement.style.setProperty('--link-color', 'white'); // Начальный цвет ссылок и иконок

        const handleScroll = () => {
            // Меняем цвет ссылок и иконок в зависимости от фона NavBar
            const bgOpacity = parseFloat(
                getComputedStyle(document.documentElement).getPropertyValue('--navbar-bg').split(',')[3] || '0'
            );

            if (bgOpacity >= 0.5) {
                document.documentElement.style.setProperty('--link-color', 'black');
                document.documentElement.style.setProperty('--icon-filter', 'brightness(0) invert(0)');
            } else {
                document.documentElement.style.setProperty('--link-color', 'white');
                document.documentElement.style.setProperty('--icon-filter', 'brightness(0) invert(1)');
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className={styles.navbar}>
            {/* Левая часть: Логотип и вкладки */}
            <div className={styles.leftSection}>
                <img src={logo} alt="Logo" className={styles.logo} />
                <div className={styles.links}>
                    {navigationItems.map((page) => (
                        <NavLink
                            key={page.path}
                            to={page.path}
                            className={({ isActive }) =>
                                isActive ? `${styles.link} ${styles.activeLink}` : styles.link
                            }
                        >
                            {page.name}
                        </NavLink>
                    ))}
                </div>
            </div>

            {/* Правая часть: Иконки */}
            <div className={styles.rightSection}>
                <SearchIcon className={styles.icon} style={{ filter: 'var(--icon-filter)' }} />
                <ProfileIcon className={styles.icon} style={{ filter: 'var(--icon-filter)' }} />
                <CartIcon className={styles.icon} style={{ filter: 'var(--icon-filter)' }} />
                <MenuIcon className={styles.icon} style={{ filter: 'var(--icon-filter)' }}/>
            </div>
        </div>
    );
};

export default NavBar;
