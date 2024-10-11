import axios from 'axios';
import { Player } from '../models/PlayerModel';
import { Staff } from '../models/StaffModel';
import logoPlaceholder from '../assets/images/placeholder_3.png';

export const getPlayers = async (): Promise<Player[]> => {
    try {
        const response = await axios.get('http://localhost:3003/api/players');
        return response.data.map((player: Player) => ({
            ...player,
            photo: player.photo || logoPlaceholder, // Используем заглушку, если фото нет
        }));
    } catch (error) {
        console.error('Ошибка при получении данных об игроках:', error);
        return [];
    }
};

export const getStaff = async (): Promise<Staff[]> => {
    try {
        const response = await axios.get('http://localhost:3003/api/staff');
        return response.data.map((staff: Staff) => ({
            ...staff,
            photo: staff.photo || logoPlaceholder, // Используем заглушку, если фото нет
        }));
    } catch (error) {
        console.error('Ошибка при получении данных о персонале:', error);
        return [];
    }
};
