import React from 'react';
import { Player } from '../../models/PlayerModel';
import styles from './PlayerCard.module.css';

interface PlayerCardProps {
    player: Player;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player }) => {
    return (
        <div className={styles.card}>
            <img src={player.photo} alt={player.full_name} className={styles.image} />
            <h3 className={styles.name}>{player.full_name}</h3>
            <p className={styles.dateOfBirth}>{new Date(player.date_of_birth).toLocaleDateString('ru-RU')}</p>
        </div>
    );
};

export default PlayerCard;
