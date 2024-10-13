import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './PlayersTab.module.css';
import { Player } from '../../models/PlayerModel';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiSXZhbjIyOCIsImFkbWluIjp0cnVlLCJpYXQiOjE3Mjg4NTc5MTMsImV4cCI6MTcyODg2MzMxM30.qLM2sXabdJE6q3GrqRY3LGiT0Qn3meNakKtFPdrLAeE';

const PlayersTab = () => {
    const [players, setPlayers] = useState<Player[]>([]);
    const [player, setPlayer] = useState({
        full_name: '',
        date_of_birth: '',
        biography: '',
        photo: '',
        position: '',
        number: '',
    });

    const fetchPlayers = async () => {
        try {
            const response = await axios.get('http://192.168.1.66:3001/api/admin/players', {
                headers: {
                    Authorization: `Bearer ${token}` // Добавляем токен в заголовок
                }
            });
            setPlayers(response.data);
        } catch (error) {
            console.error('Ошибка при загрузке игроков:', error);
        }
    };

    const addPlayer = async () => {
        try {
            await axios.post('http://192.168.1.66:3001/api/admin/players', player, {
                headers: {
                    Authorization: `Bearer ${token}` // Добавляем токен в заголовок
                }
            });
            fetchPlayers();
            setPlayer({ full_name: '', date_of_birth: '', biography: '', photo: '', position: '', number: '' });
        } catch (error) {
            console.error('Ошибка при добавлении игрока:', error);
        }
    };

    // Функция для удаления игрока
    const deletePlayer = async (playerId: number) => {
        try {
            await axios.delete(`http://192.168.1.66:3001/api/admin/players/${playerId}`, {
                headers: {
                    Authorization: `Bearer ${token}` // Добавляем токен в заголовок
                }
            });
            fetchPlayers(); // Обновляем список игроков после удаления
        } catch (error) {
            console.error('Ошибка при удалении игрока:', error);
        }
    };

    useEffect(() => {
        fetchPlayers();
    }, []);

    return (
        <div className={styles.playersTab}>
            <h2>Игроки</h2>
            <div className={styles.inputGroup}>
                <input
                    type="text"
                    value={player.full_name}
                    onChange={(e) => setPlayer({ ...player, full_name: e.target.value })}
                    placeholder="Полное имя"
                />
                <input
                    type="date"
                    value={player.date_of_birth}
                    onChange={(e) => setPlayer({ ...player, date_of_birth: e.target.value })}
                />
                <input
                    type="text"
                    value={player.biography}
                    onChange={(e) => setPlayer({ ...player, biography: e.target.value })}
                    placeholder="Биография"
                />
                <input
                    type="text"
                    value={player.photo}
                    onChange={(e) => setPlayer({ ...player, photo: e.target.value })}
                    placeholder="Ссылка на фото"
                />
                <input
                    type="text"
                    value={player.position}
                    onChange={(e) => setPlayer({ ...player, position: e.target.value })}
                    placeholder="Позиция"
                />
                <input
                    type="text"
                    value={player.number}
                    onChange={(e) => setPlayer({ ...player, number: e.target.value })}
                    placeholder="Номер"
                />
            </div>
            <button onClick={addPlayer} className={styles.addButton}>Добавить игрока</button>
            <ul className={styles.playersList}>
                {players.map((player) => (
                    <li key={player.id} className={styles.playerItem}>
                        <h3>{player.full_name}</h3>
                        <p>{player.biography}</p>
                        <p>{player.position}</p>
                        <p>{player.number}</p>
                        <p><strong>Дата рождения:</strong> {new Date(player.date_of_birth).toLocaleDateString()}</p>
                        <button onClick={() => deletePlayer(player.id)} className={styles.deleteButton}>
                            Удалить игрока
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PlayersTab;
