export interface ButtonModel {
    text: string;
    link?: string; // Опциональная ссылка для кнопки
    action?: () => void; // Опциональная функция для действия
}
