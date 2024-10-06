// src/config/navigation.ts
export interface NavigationItem {
    name: string;
    path: string;
}

// Определяем все страницы, которые будут отображаться в навигации
export const navigationItems: NavigationItem[] = [
    { name: 'НОВОСТИ', path: '/' },
    { name: 'МАТЧИ', path: '/about' },
    { name: 'КОМАНДА', path: '/contact' },
];
