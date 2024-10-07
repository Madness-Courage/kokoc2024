import React, { useState } from 'react';
import styles from './NewsPage.module.css';
import { ReactComponent as SearchIcon } from '../../assets/icons/search.svg';
import { ReactComponent as ClearIcon } from '../../assets/icons/menu.svg';
import PageTemplate from '../../components/PageTemplate/PageTemplate';
import logoPlaceholder from '../../assets/images/placeholder.jpg';
import RangePick from '../../modules/DatePicker/DatePicker'


interface NewsItem {
    id: number;
    image: string;
    title: string;
    description: string;
    date: string;
    time: string;
    isImportant: boolean;
}

const initialNews: NewsItem[] = [
    {
        id: 1,
        image: logoPlaceholder,
        title: 'Главная новость',
        description: 'Описание главной новости с возможностью перейти к ней',
        date: '2024-10-06',
        time: '12:00',
        isImportant: true,
    },
    {
        id: 2,
        image: logoPlaceholder,
        title: 'Новость 2',
        description: 'Описание новости с возможностью перейти к ней',
        date: '2024-10-05',
        time: '10:09',
        isImportant: false,
    },
    {
        id: 3,
        image: logoPlaceholder,
        title: 'Новость 2',
        description: 'Описание новости с возможностью перейти к ней',
        date: '2024-10-05',
        time: '10:08',
        isImportant: false,
    },
    {
        id: 4,
        image: logoPlaceholder,
        title: 'Новость 2',
        description: 'Описание новости с возможностью перейти к ней',
        date: '2024-10-05',
        time: '10:07',
        isImportant: false,
    },
    {
        id: 5,
        image: logoPlaceholder,
        title: 'Новость 2',
        description: 'Описание новости с возможностью перейти к ней',
        date: '2024-10-05',
        time: '10:06',
        isImportant: false,
    },
    {
        id: 6,
        image: logoPlaceholder,
        title: 'Новость 2',
        description: 'Описание новости с возможностью перейти к ней',
        date: '2024-10-05',
        time: '10:05',
        isImportant: false,
    },
    {
        id: 7,
        image: logoPlaceholder,
        title: 'Новость 2',
        description: 'Описание новости с возможностью перейти к ней',
        date: '2024-10-05',
        time: '10:04',
        isImportant: false,
    },
    {
        id: 8,
        image: logoPlaceholder,
        title: 'Новость 2',
        description: 'Описание новости с возможностью перейти к ней',
        date: '2024-10-05',
        time: '10:03',
        isImportant: false,
    },
    {
        id: 9,
        image: logoPlaceholder,
        title: 'Новость 2',
        description: 'Описание новости с возможностью перейти к ней',
        date: '2024-10-05',
        time: '10:02',
        isImportant: false,
    },
    {
        id: 10,
        image: logoPlaceholder,
        title: 'Новость 2',
        description: 'Описание новости с возможностью перейти к ней',
        date: '2024-10-05',
        time: '10:01',
        isImportant: false,
    },
    {
        id: 11,
        image: logoPlaceholder,
        title: 'Новость 2',
        description: 'Описание новости с возможностью перейти к ней',
        date: '2024-10-05',
        time: '10:00',
        isImportant: false,
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

    const importantNews = news.filter((item) => item.isImportant).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
    const otherNews = news.filter((item) => !item.isImportant);

    const handleClearFilters = () => {
        setSearchQuery('');
        setCategory('');
        setDateRange([...initialDateRange]);
    };

    return (
        <PageTemplate backgroundImage={logoPlaceholder}>
            <div className={styles.newsContainer}>
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
                {importantNews && (
                    <div className={styles.mainNews}>
                        <img src={importantNews.image} alt={importantNews.title} className={styles.mainNewsImage}/>
                        <div className={styles.mainNewsContent}>
                            <h2>{importantNews.title}</h2>
                            <p>{importantNews.description}</p>
                            <span className={styles.mainNewsDate}>
                            {importantNews.date} — {importantNews.time}
                        </span>
                        </div>
                    </div>
                )}

                {/* Другие новости */}
                <div className={styles.newsGrid}>
                    {otherNews.map((item) => (
                        <div key={item.id} className={styles.newsItem}>
                            <img src={item.image} alt={item.title} className={styles.newsImage}/>
                            <div className={styles.newsContent}>
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                                <span className={styles.newsDate}>
                                {item.date} — {item.time}
                            </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Пагинация */}
                <div className={styles.pagination}>
                    <button>{'<'}</button>
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                    <span>...</span>
                    <span>9</span>
                    <button>{'>'}</button>
                </div>
            </div>
        </PageTemplate>
    );
};

export default NewsModule;
