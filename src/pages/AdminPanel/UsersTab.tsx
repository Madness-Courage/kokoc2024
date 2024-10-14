import React, { useState } from 'react';
import axios from 'axios';
import styles from './UsersTab.module.css';

const UsersTab = () => {
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');

    const makeAdmin = async () => {
        try {
            const response = await axios.put('http://localhost:3001/api/admin/users/make-admin', { username });
            setMessage(response.data.message);
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                setMessage(error.response?.data?.error || 'Ошибка при выполнении запроса');
            } else {
                setMessage('Неизвестная ошибка');
            }
        }

    };

    const makeNotAdmin = async () => {
        try {
            const response = await axios.put('http://localhost:3001/api/admin/users/make-not-admin', { username });
            setMessage(response.data.message);
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                setMessage(error.response?.data?.error || 'Ошибка при выполнении запроса');
            } else {
                setMessage('Неизвестная ошибка');
            }
        }

    };

    return (
        <div className={styles.usersTab}>
            <h2>Управление пользователями</h2>
            <div className={styles.inputGroup}>
                <label htmlFor="username">Имя пользователя</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Введите имя пользователя"
                />
            </div>
            <div className={styles.buttons}>
                <button onClick={makeAdmin}>Сделать админом</button>
                <button onClick={makeNotAdmin}>Сделать не админом</button>
            </div>
            {message && <p className={styles.message}>{message}</p>}
        </div>
    );
};

export default UsersTab;

