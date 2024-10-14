import React, { useState } from 'react';
import UsersTab from './UsersTab';
import NewsTab from './NewsTab';
import MatchesTab from './MatchesTab';
import ProductsTab from './PlayersTab';
import styles from './AdminPanel.module.css';

const AdminPanel = () => {
    const [activeTab, setActiveTab] = useState('users');

    const renderTabContent = () => {
        switch (activeTab) {
            case 'users':
                return <UsersTab />;
            case 'news':
                return <NewsTab />;
            case 'matches':
                return <MatchesTab />;
            case 'products':
                return <ProductsTab />;
            default:
                return <div>Выберите вкладку</div>;
        }
    };

    return (
        <div className={styles.adminPanel}>
            <div className={styles.tabs}>
                <button onClick={() => setActiveTab('users')}>Users</button>
                <button onClick={() => setActiveTab('news')}>News</button>
                <button onClick={() => setActiveTab('matches')}>Matches</button>
                <button onClick={() => setActiveTab('products')}>Products</button>
            </div>
            <div className={styles.content}>
                {renderTabContent()}
            </div>
        </div>
    );
};

export default AdminPanel;
