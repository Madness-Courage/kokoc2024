// src/pages/Main/MainPage.tsx
import React from 'react';
import PageTemplate from '../../components/PageTemplate/PageTemplate';
import logoPlaceholder from '../../assets/images/placeholder.jpg';

const MainPage: React.FC = () => {
    return (
        <PageTemplate backgroundImage={logoPlaceholder}>
            <h1>Main Page Content</h1>
            <div style={{height: 2000,}}></div>
            <p>This is the main page content. Scroll to see the effect.</p>
        </PageTemplate>
    );
};

export default MainPage;
