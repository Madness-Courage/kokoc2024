export interface Match {
    date: string;
    time: string;
    place: string;
    opponentName: string;
    opponentLogo: string;
    registerLink: string;
    airUrl?: string; // Ссылка на трансляцию (необязательное поле)
    isActive?: boolean; // Флаг, активен ли матч для трансляции (необязательное поле)
}
