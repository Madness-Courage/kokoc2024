// src/pages/Main/MainPage.tsx
import React from 'react'
import PageTemplate from '../../components/PageTemplate/PageTemplate'
import placeholder1 from '../../assets/images/placeholder.jpg';
import placeholder2 from '../../assets/images/placeholder_2.jpg';
import placeholder3 from '../../assets/images/placeholder_3.png';
import { NewsItem } from '../../models/NewsModel'; // Импорт модели NewsItem

const initialNews: NewsItem[] = [
    {
        id: 1,
        image: placeholder1,
        title: 'Главная новость',
        description: 'Описание главной новости с возможностью перейти к ней',
        date: '2024-10-06',
        time: '12:00',
        isImportant: true,
        link: ''
    },
    {
        id: 2,
        image: placeholder2,
        title: 'Новость 2',
        description: 'Описание новости с возможностью перейти к ней',
        date: '2024-10-05',
        time: '10:09',
        isImportant: false,
        link: ''
    },
    {
        id: 3,
        image: placeholder3,
        title: 'Новость 3',
        description: 'Описание новости с возможностью перейти к ней',
        date: '2024-10-05',
        time: '10:08',
        isImportant: false,
        link: ''
    },
];


const MainPage: React.FC = () => {
    const images = [placeholder1, placeholder2, placeholder3];
    return (
        <PageTemplate newsItem={initialNews}>
            <h1>Main Page Content</h1>
            <div style={{ height: 2000 }}></div>
            <p>This is the main page content. Scroll to see the effect.</p>
        </PageTemplate>
    )
}

export default MainPage
