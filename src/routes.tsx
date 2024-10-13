// src/routes.tsx
import PageWithNavBar from './layouts/PageWithNavBar'
import { PrimeReactProvider } from 'primereact/api'
import 'primereact/resources/primereact.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css'

import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import AccountPage from './pages/Account/AccountPage'
import MainPage from './pages/Main/MainPage'
import MatchesPage from './pages/Matches/MatchesPage'
import NewsPage from './pages/News/NewsPage'
import TeamPage from './pages/Team/TeamPage'
import AboutPage from './pages/About/AboutPage'
import AdminPanel from './pages/AdminPanel/AdminPanel'

const AppRoutes: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<MainPage />} />
                <Route
                    path='/matches'
                    element={
                        <PrimeReactProvider>
                            <MatchesPage />
                        </PrimeReactProvider>
                    }
                />
                <Route
                    path='/team'
                    element={
                        <PrimeReactProvider>
                            <TeamPage />
                        </PrimeReactProvider>
                    }
                />
                <Route
                    path='/news'
                    element={
                        <PrimeReactProvider>
                            <NewsPage />
                        </PrimeReactProvider>
                    }
                />
                <Route path='/account/*' element={<AccountPage />} />
                <Route
                    path='/about'
                    element={
                        <PrimeReactProvider>
                            <AboutPage />
                        </PrimeReactProvider>
                    }
                />
                <Route
                    path='/admin'
                    element={
                        <PrimeReactProvider>
                            <AdminPanel />
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
