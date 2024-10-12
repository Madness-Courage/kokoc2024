// src/config/navigation.ts
export interface NavigationItem {
    name: string
    path: string
}

// Определяем все страницы, которые будут отображаться в навигации
export const navigationItems: NavigationItem[] = [
    { name: 'НОВОСТИ', path: '/news' },
    { name: 'МАТЧИ', path: '/matches' },
    { name: 'КОМАНДА', path: '/team' },
]
