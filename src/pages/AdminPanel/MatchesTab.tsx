import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './MatchesTab.module.css';

interface Match {
    id: number;
    team1: string;
    team1_logo_url: string;
    team2: string;
    team2_logo_url: string;
    team1_goals: number;
    team2_goals: number;
    stadium: string;
    start_time: string;
    stream_url?: string;
    registration_form_url?: string;
}

const MatchesTab = () => {
    const [matches, setMatches] = useState<Match[]>([]);
    const [match, setMatch] = useState({
        team1: '',
        team1_logo_url: '',
        team2: '',
        team2_logo_url: '',
        team1_goals: 0,
        team2_goals: 0,
        stadium: '',
        start_time: '',
        stream_url: '',
        registration_form_url: '',
    });


    // Функция для получения матчей
    const fetchMatches = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/admin/matches');
            setMatches(response.data);
        } catch (error) {
            console.error('Ошибка при загрузке матчей:', error);
        }
    };

    // Функция для добавления нового матча
    const addMatch = async () => {
        try {
            await axios.post('http://localhost:3001/api/admin/matches', match);
            fetchMatches();
            setMatch({
                team1: '',
                team1_logo_url: '',
                team2: '',
                team2_logo_url: '',
                team1_goals: 0,
                team2_goals: 0,
                stadium: '',
                start_time: '',
                stream_url: '',
                registration_form_url: '',
            });
        } catch (error) {
            console.error('Ошибка при добавлении матча:', error);
        }
    };

    useEffect(() => {
        fetchMatches();
    }, []);

    return (
        <div className={styles.matchesTab}>
            <h2>Матчи</h2>
            <div className={styles.inputGroup}>
                <input
                    type="text"
                    value={match.team1}
                    onChange={(e) => setMatch({ ...match, team1: e.target.value })}
                    placeholder="Команда 1"
                />
                <input
                    type="text"
                    value={match.team1_logo_url}
                    onChange={(e) => setMatch({ ...match, team1_logo_url: e.target.value })}
                    placeholder="Лого Команды 1 (URL)"
                />
                <input
                    type="text"
                    value={match.team2}
                    onChange={(e) => setMatch({ ...match, team2: e.target.value })}
                    placeholder="Команда 2"
                />
                <input
                    type="text"
                    value={match.team2_logo_url}
                    onChange={(e) => setMatch({ ...match, team2_logo_url: e.target.value })}
                    placeholder="Лого Команды 2 (URL)"
                />
                <input
                    type="number"
                    value={match.team1_goals}
                    onChange={(e) => setMatch({ ...match, team1_goals: Number(e.target.value) })}
                    placeholder="Голы Команды 1"
                />
                <input
                    type="number"
                    value={match.team2_goals}
                    onChange={(e) => setMatch({ ...match, team2_goals: Number(e.target.value) })}
                    placeholder="Голы Команды 2"
                />
                <input
                    type="text"
                    value={match.stadium}
                    onChange={(e) => setMatch({ ...match, stadium: e.target.value })}
                    placeholder="Стадион"
                />
                <input
                    type="datetime-local"
                    value={match.start_time}
                    onChange={(e) => setMatch({ ...match, start_time: e.target.value })}
                />
                <input
                    type="text"
                    value={match.stream_url}
                    onChange={(e) => setMatch({ ...match, stream_url: e.target.value })}
                    placeholder="Ссылка на стрим"
                />
                <input
                    type="text"
                    value={match.registration_form_url}
                    onChange={(e) => setMatch({ ...match, registration_form_url: e.target.value })}
                    placeholder="Ссылка на регистрацию"
                />
            </div>
            <button onClick={addMatch} className={styles.addButton}>Добавить матч</button>
            <ul className={styles.matchesList}>
                {matches.map((match) => (
                    <li key={match.id} className={styles.matchItem}>
                        <h3>{match.team1} vs {match.team2}</h3>
                        <p>{new Date(match.start_time).toLocaleString()}</p>
                        <p><strong>Стадион:</strong> {match.stadium}</p>
                        <p><strong>Счёт:</strong> {match.team1_goals} : {match.team2_goals}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MatchesTab;
