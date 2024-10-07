// src/routes.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainPage from './pages/Main/MainPage'
import NewsPage from './pages/News/NewsPage'
import PageWithNavBar from './layouts/PageWithNavBar'
import { PrimeReactProvider } from 'primereact/api'
import 'primereact/resources/primereact.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css'

const AppRoutes: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route
                    path='/'
                    element={
                        <PageWithNavBar>
                            <MainPage />
                        </PageWithNavBar>
                    }
                />
                <Route
                    path='/about'
                    element={
                        <PageWithNavBar>
                            <div>About Page</div>
                        </PageWithNavBar>
                    }
                />
                <Route path='/contact' element={<div>Contact Page</div>} />
                    path="/news"
                    element={
                        <PrimeReactProvider>
                            <NewsPage />
                        </PrimeReactProvider>
                    }
                />
                {/* Добавь другие маршруты здесь */}
                {/*<Route path="/about" element={<div>About Page</div>} />*/}
                {/*<Route path="/contact" element={<div>Contact Page</div>} />*/}
            </Routes>
        </Router>
    )
}

export default AppRoutes
