// src/components/NavBar/NavBar.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.css';
import logo from '../../assets/images/logo.svg';

const pages = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    // Добавь сюда другие страницы, которые нужно отобразить в навигации
];

const NavBar: React.FC = () => {
    return (
        <div className={styles.navbar}>
            <div className={styles.block}>
                <img src={logo} alt="Logo" className={styles.logo} />
            </div>
            <div className={styles.block}>
                {pages.map((page) => (
                    <NavLink
                        key={page.path}
                        to={page.path}
                        className={({ isActive }) =>
                            isActive ? styles.activeLink : styles.link
                        }
                    >
                        {page.name}
                    </NavLink>
                ))}
            </div>
            <div className={styles.block}>Search</div>
        </div>
    );
};

export default NavBar;
