// src/layouts/PageWithNavBar.tsx
import React from 'react';
import NavBar from '../components/NavBar/NavBar';

interface PageWithNavBarProps {
    children: React.ReactNode;
}

const PageWithNavBar: React.FC<PageWithNavBarProps> = ({ children }) => {
    return (
        <>
            <NavBar />
            <div>{children}</div>
        </>
    );
};

export default PageWithNavBar;
