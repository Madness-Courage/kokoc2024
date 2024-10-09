import React, { useState } from 'react';
import styles from './NewsPage.module.css';
import { ReactComponent as SearchIcon } from '../../assets/icons/search.svg';
import PageTemplate from '../../components/PageTemplate/PageTemplate';
import logoPlaceholder from '../../assets/images/placeholder_3.png';
import RangePick from '../../modules/DatePicker/DatePicker'
import NewsCard from '../../modules/NewsCard/NewsCard'
import ActionMenu from '../../modules/ActionMenu/ActionMenu';
import { ButtonModel } from '../../models/ButtonModel';
import { NewsItem } from '../../models/NewsModel';
import InterviewSlider from '../../modules/InterviewSlider/InterviewSlider';


const initialNews: NewsItem[] = [
    {
        id: 1,
        image: logoPlaceholder,
        title: 'Главная новость Главная новость Главная новость Главная новость Главная новость Главная новость Главная новость Главная новость Главная новость Главная новость Главная новость Главная новость ',
        description: 'Описание главной новости с возможностью перейти к ней Описание главной новости с возможностью перейти к ней Описание главной новости с возможностью перейти к ней Описание главной новости с возможностью перейти к ней Описание главной новости с возможностью перейти к ней ',
        date: '2024-10-06',
        time: '12:00',
        isImportant: true,
        link: '',
    },
    {
        id: 2,
        image: logoPlaceholder,
        title: 'Интервью: Нога Акинфеева',
        description: 'Интервью: Нога Акинфеева',
        date: '2024-10-05',
        time: '10:09',
        isImportant: false,
        link: '',
    },
    {
        id: 3,
        image: logoPlaceholder,
        title: 'Новость 2',
        description: 'Описание новости с возможностью перейти к ней',
        date: '2024-10-05',
        time: '10:08',
        isImportant: false,
        link: '',
    },
    {
        id: 4,
        image: logoPlaceholder,
        title: 'Главная новость Главная новость Главная новость Главная новость Главная новость Главная новость Главная новость Главная новость Главная новость Главная новость Главная новость Главная новость ',
        description: 'Описание главной новости с возможностью перейти к ней Описание главной новости с возможностью перейти к ней Описание главной новости с возможностью перейти к ней Описание главной новости с возможностью перейти к ней Описание главной новости с возможностью перейти к ней ',

        date: '2024-10-05',
        time: '10:07',
        isImportant: false,
        link: '',
    },
    {
        id: 5,
        image: logoPlaceholder,
        title: 'Новость 2',
        description: 'Описание новости с возможностью перейти к ней',
        date: '2024-10-05',
        time: '10:06',
        isImportant: false,
        link: '',
    },
    {
        id: 6,
        image: logoPlaceholder,
        title: 'Интервью с капитаном команды',
        description: 'Описание новости с возможностью перейти к ней',
        date: '2024-10-05',
        time: '10:05',
        isImportant: false,
        link: '',
    },
    {
        id: 7,
        image: logoPlaceholder,
        title: 'Новость 2',
        description: 'Описание новости с возможностью перейти к ней',
        date: '2024-10-05',
        time: '10:04',
        isImportant: false,
        link: '',
    },
    {
        id: 8,
        image: logoPlaceholder,
        title: 'Новость 2',
        description: 'Описание новости с возможностью перейти к ней',
        date: '2024-10-05',
        time: '10:03',
        isImportant: false,
        link: '',
    },
    {
        id: 9,
        image: logoPlaceholder,
        title: 'Новость 2',
        description: 'Описание новости с возможностью перейти к ней',
        date: '2024-10-05',
        time: '10:02',
        isImportant: false,
        link: '',
    },
    {
        id: 10,
        image: logoPlaceholder,
        title: 'Новость 2',
        description: 'Описание новости с возможностью перейти к ней',
        date: '2024-10-05',
        time: '10:01',
        isImportant: false,
        link: '',
    },
    {
        id: 11,
        image: logoPlaceholder,
        title: 'Новость 2',
        description: 'Описание новости с возможностью перейти к ней',
        date: '2024-10-05',
        time: '10:00',
        isImportant: false,
        link: '',
    },

    // Добавь сюда другие новости
];

const initialDateRange: Date[] = [
    new Date(2001, 8, 11), // 11 сентября 2001 года
    new Date() // Сегодняшняя дата
];

const NewsModule: React.FC = () => {
    const [news, setNews] = useState(initialNews);
    const [searchQuery, setSearchQuery] = useState('');
    const [category, setCategory] = useState('');
    // @ts-ignore
    const [dateRange, setDateRange] = useState<Date[] | null>(initialDateRange);
    const [currentPage, setCurrentPage] = useState(1);
    const newsPerPage = currentPage === 1 ? 6 : 9; // 7 новостей на первой странице, 9 на остальных

    // Вычисляем начальный и конечный индекс новостей для текущей страницы
    const startIndex = currentPage === 1 ? 0 : 6 + (currentPage - 2) * 9;
    const endIndex = startIndex + newsPerPage;
    const displayedNews = initialNews.slice(startIndex, endIndex); // Новости для отображения на текущей странице

    // Действие для перемотки страницы вниз
    const scrollToContent = () => {
        window.scrollTo({
            top: window.innerHeight + 75, // Прокрутка до следующего экрана
            behavior: 'smooth',
        });
    };

    // Вычисляем общее количество страниц
    const totalPages = Math.ceil((initialNews.length - 7) / 9) + 1; // 1 страница на 7 новостей + остальные

    const importantNews = news.filter((item) => item.isImportant).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
    const otherNews = news.filter((item) => !item.isImportant);

    const handleClearFilters = () => {
        setSearchQuery('');
        setCategory('');
        setDateRange([...initialDateRange]);
    };

    const buttons: ButtonModel[] = [
        { text: 'Новости', action: scrollToContent },
        { text: 'Галерея', link: 'https://www.google.com' },
        { text: 'Видео', link: 'https://www.google.com' },
    ];

    return (
        <PageTemplate backgroundImage={logoPlaceholder}>
            <div className={styles.newsContainer}>
                {/*<div className={styles.ActionButtons}*/}
                <ActionMenu buttons={buttons} />
                {/* Поиск */}
                <div className={styles.searchWrapper}>
                    <input
                        type="text"
                        placeholder="Найти"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={styles.searchInput}
                    />
                    <SearchIcon className={styles.searchIcon}/>
                </div>

                {/* Фильтры */}
                <div className={styles.filters}>

                    {/* Категории */}
                    <div className={styles.category}>
                        <select value={category} onChange={(e) => setCategory(e.target.value)}
                                className={styles.categorySelect}>
                            <option value="">Категория</option>
                            <option value="sport">Спорт</option>
                            <option value="news">Новости</option>
                            <option value="technology">Технологии</option>
                        </select>
                    </div>

                    {/* Даты */}
                    <div className={styles.dates}>
                        <RangePick dateRange={dateRange} setDateRange={setDateRange} />
                    </div>

                    <button onClick={handleClearFilters} className={styles.clear} >
                    </button>

                </div>

                {/* Главная новость */}
                {importantNews && currentPage === 1 && (
                    <div className={styles.mainNews}>
                        {/* Картинка новости */}
                        <img src={importantNews.image} alt={importantNews.title} className={styles.mainNewsImage} />
                        <div className={styles.mainNewsOverlay}>
                            <h2 className={styles.mainNewsTitle}>{importantNews.title}</h2>
                            <p className={styles.mainNewsDescription}>{importantNews.description}</p>
                            <span className={styles.mainNewsDate}>
                {/* Разделяем дату и время */}
                                <span className={styles.mainDatePart}>
                    {new Date(importantNews.date).toLocaleDateString('ru-RU', {
                        day: '2-digit',
                        month: '2-digit',
                    })}
                </span>
                <span className={styles.mainTimePart}> — {importantNews.time}</span>
            </span>
                        </div>
                    </div>
                )}


                {/* Другие новости */}
                <div className={styles.newsGrid}>
                    {otherNews
                        .filter((item) => item.id !== importantNews?.id) // Исключаем главную новость из списка остальных
                        .slice(startIndex, endIndex) // Пагинация для остальных новостей
                        .map((item) => (
                            <NewsCard key={item.id} item={item} />
                        ))}
                </div>


                {/* Пагинация */}
                <div className={styles.pagination}>
                    {/* Кнопка для перехода на предыдущую страницу */}
                    <button
                        className={styles.paginationButton}
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1} // Отключаем кнопку, если это первая страница
                    >
                        {'<'}
                    </button>

                    {/* Номера страниц */}
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            className={`${styles.paginationCircle} ${currentPage === index + 1 ? styles.activeCircle : ''}`}
                            onClick={() => setCurrentPage(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}

                    {/* Кнопка для перехода на следующую страницу */}
                    <button
                        className={styles.paginationButton}
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages} // Отключаем кнопку, если это последняя страница
                    >
                        {'>'}
                    </button>
                </div>

                <InterviewSlider news={initialNews} />

            </div>
        </PageTemplate>
    );
};

export default NewsModule;
