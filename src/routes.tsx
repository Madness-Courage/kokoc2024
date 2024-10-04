// src/routes.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/Main/MainPage';
import PageWithNavBar from './layouts/PageWithNavBar';

const AppRoutes: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        <PageWithNavBar>
                            <MainPage />
                        </PageWithNavBar>
                    }
                />
                {/* Добавь другие маршруты здесь */}
                <Route path="/about" element={<div>About Page</div>} />
                <Route path="/contact" element={<div>Contact Page</div>} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
