import React, { useEffect, useState } from 'react';
import PageTemplate from '../../components/PageTemplate/PageTemplate';
import logoPlaceholder from '../../assets/images/placeholder.jpg';
import ActionMenu from '../../modules/ActionMenu/ActionMenu';
import Notification from '../../modules/Notification/Notification';
import PlayerCard from '../../modules/PlayerCard/PlayerCard';
import StaffCard from '../../modules/StaffCard/StaffCard';
import { ButtonModel } from '../../models/ButtonModel';
import { Player } from '../../models/PlayerModel';
import { Staff } from '../../models/StaffModel';
import { getPlayers, getStaff } from '../../api/teamApi';
import styles from './TeamPage.module.css';

// Временные данные для игроков и персонала
const initialPlayers: Player[] = [
    {
        id: 1,
        photo: logoPlaceholder,
        full_name: 'Игрок 1',
        date_of_birth: '1995-06-15',
        biography: 'Описание игрока 1.',
    },
    {
        id: 2,
        photo: logoPlaceholder,
        full_name: 'Игрок 2',
        date_of_birth: '1997-04-22',
        biography: 'Описание игрока 2.',
    },
    {
        id: 3,
        photo: logoPlaceholder,
        full_name: 'Игрок 3',
        date_of_birth: '2000-09-10',
        biography: 'Описание игрока 3.',
    },
];

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

const TeamPage: React.FC = () => {
    // const [players, setPlayers] = useState<Player[]>([]);
    // const [staff, setStaff] = useState<Staff[]>([]);
    const [players] = useState<Player[]>(initialPlayers); // Используем временные данные игроков
    const [staff] = useState<Staff[]>(initialStaff); // Используем временные данные персонала
    const [notification, setNotification] = useState('');

    // // Загрузка данных об игроках и персонале при монтировании компонента
    // useEffect(() => {
    //     const loadData = async () => {
    //         const playersData = await getPlayers();
    //         const staffData = await getStaff();
    //         setPlayers(playersData);
    //         setStaff(staffData);
    //     };
    //
    //     loadData();
    // }, []);

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

    return (
        <PageTemplate backgroundImages={[logoPlaceholder]}>
            <div className={styles.teamContainer}>
                <ActionMenu buttons={buttons} />

                {/* Игроки */}
                <h2 className={styles.sectionTitle}>ИГРОКИ</h2>
                <div className={styles.playersGrid}>
                    {players.map((player) => (
                        <PlayerCard key={player.id} player={player} />
                    ))}
                </div>

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
