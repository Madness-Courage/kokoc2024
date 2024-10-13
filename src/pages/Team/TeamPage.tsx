import React, { useState, useEffect } from 'react';
import PageTemplate from '../../components/PageTemplate/PageTemplate';
import logoPlaceholder from '../../assets/images/placeholder.jpg';
import ActionMenu from '../../modules/ActionMenu/ActionMenu';
import Notification from '../../modules/Notification/Notification';
import PlayerCard from '../../modules/PlayerCard/PlayerCard';
import StaffCard from '../../modules/StaffCard/StaffCard';
import { ButtonModel } from '../../models/ButtonModel';
import { Player } from '../../models/PlayerModel';
import { Staff } from '../../models/StaffModel';
import { getPlayers } from '../../api/teamApi';
import styles from './TeamPage.module.css';

// const initialPlayers: Player[] = [
//     {
//         id: 1,
//         photo: logoPlaceholder,
//         full_name: 'Игрок 1',
//         date_of_birth: '1995-06-15',
//         biography: 'Описание игрока 1.',
//         position: 'Вратарь',
//     },
//     {
//         id: 2,
//         photo: logoPlaceholder,
//         full_name: 'Игрок 2',
//         date_of_birth: '1997-04-22',
//         biography: 'Описание игрока 2.',
//         position: 'Защитник',
//     },
//     {
//         id: 3,
//         photo: logoPlaceholder,
//         full_name: 'Игрок 3',
//         date_of_birth: '2000-09-10',
//         biography: 'Описание игрока 3.',
//         position: 'Полузащитник',
//     },
//     {
//         id: 4,
//         photo: logoPlaceholder,
//         full_name: 'Игрок 4',
//         date_of_birth: '1998-08-12',
//         biography: 'Описание игрока 4.',
//         position: 'Нападающий',
//     },
// ];

const initialStaff: Staff[] = [
    {
        id: 1,
        photo: logoPlaceholder,
        full_name: 'Тренер 1',
        role: 'Главный тренер',
    },
    {
        id: 2,
        photo: logoPlaceholder,
        full_name: 'Тренер 2',
        role: 'Ассистент тренера',
    },
    {
        id: 3,
        photo: logoPlaceholder,
        full_name: 'Менеджер 1',
        role: 'Менеджер команды',
    },
];

// Функция для отображения заголовков позиций во множественном числе
const getPositionTitle = (position: string) => {
    switch (position) {
        case 'Вратарь':
            return 'Вратари';
        case 'Защитник':
            return 'Защитники';
        case 'Полузащитник':
            return 'Полузащитники';
        case 'Нападающий':
            return 'Нападающие';
        default:
            return '';
    }
};

const TeamPage: React.FC = () => {
    const [players, setPlayers] = useState<Player[]>([]); // Используем временные данные игроков
    const [staff] = useState<Staff[]>(initialStaff); // Используем временные данные персонала
    const [notification, setNotification] = useState('');

    useEffect(() => {
        // Загружаем новости при монтировании компонента
        const loadPlayers = async () => {
            const initialPlayers = await getPlayers();
            setPlayers(initialPlayers);
        };

        loadPlayers();
    }, []);

    const initialPlayers = players;

    const showNotification = () => {
        setNotification('Этот раздел пока не готов, но мы работаем над его добавлением');
    };

    const closeNotification = () => {
        setNotification('');
    };

    const buttons: ButtonModel[] = [
        { text: 'Игроки', link: '' },
        { text: 'Тренеры', link: 'https://www.google.com' },
        { text: 'Персонал', action: showNotification },
    ];

    // Группируем игроков по позициям
    const groupedPlayers = players.reduce<{ [key: string]: Player[] }>((acc, player) => {
        if (!acc[player.position]) {
            acc[player.position] = [];
        }
        acc[player.position].push(player);
        return acc;
    }, {});

    return (
        <PageTemplate backgroundImages={[logoPlaceholder]}>
            <div className={styles.teamContainer}>
                <ActionMenu buttons={buttons} />

                {/* Игроки, разделенные по позициям */}
                {Object.keys(groupedPlayers).map((position) => (
                    <div key={position}>
                        <h2 className={styles.sectionTitle}>{getPositionTitle(position)}</h2>
                        <div className={styles.playersGrid}>
                            {groupedPlayers[position].map((player) => (
                                <PlayerCard key={player.id} player={player} />
                            ))}
                        </div>
                    </div>
                ))}

                {/* Персонал */}
                <h2 className={styles.sectionTitle}>ПРЕДСТАВИТЕЛИ КЛУБА</h2>
                <div className={styles.staffGrid}>
                    {staff.map((staffMember) => (
                        <StaffCard key={staffMember.id} staff={staffMember} />
                    ))}
                </div>

                {/* Уведомление, если оно активно */}
                {notification && (
                    <Notification message={notification} onClose={closeNotification} />
                )}
            </div>
        </PageTemplate>
    );
};

export default TeamPage;
