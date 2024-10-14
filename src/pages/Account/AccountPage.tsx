import React from 'react'
import PageWithNavBar from '../../layouts/PageWithNavBar'
import { ReactComponent as LeftLongArrowIcon } from '../../assets/icons/left-long-arrow.svg'
import { ReactComponent as EditIcon } from '../../assets/icons/edit.svg'
import styles from './AccountPage.module.css'
import {
    Navigate,
    Route,
    Routes,
    useLocation,
    useNavigate,
} from 'react-router-dom'
import Subscriptions from './Subscriptions/Subscriptions'
import Information from './Information/Information'
import History from './History/History'
import Matches from './Matches/Matches'
import Comments from './Comments/Comments'

export const navigationItems = [
    {
        text: 'Личная информация',
        relativePath: 'information',
        absolutePath: '/account/information',
        element: <Information />,
    },
    {
        text: 'Подписки',
        relativePath: 'subscriptions',
        absolutePath: '/account/subscriptions',
        element: <Subscriptions />,
    },
    {
        text: 'История покупок',
        relativePath: 'history',
        absolutePath: '/account/history',
        element: <History />,
    },
    {
        text: 'Посещенные матчи',
        relativePath: 'matches',
        absolutePath: '/account/matches',
        element: <Matches />,
    },
    {
        text: 'Комментарии',
        relativePath: 'comments',
        absolutePath: '/account/comments',
        element: <Comments />,
    },
]

const AccountPage: React.FC = () => {
    const location = useLocation()
    const navigate = useNavigate()

    return (
        <PageWithNavBar dark>
            <div className={styles.page}>
                <div className={styles.headerBlock}>
                    <div
                        onClick={() => navigate('/')}
                        className={styles.backButton}
                    >
                        <LeftLongArrowIcon />
                        Вернуться назад
                    </div>
                </div>
                <div className={styles.mainBlock}>
                    <div className={styles.navigationBlock}>
                        {navigationItems.map((item, index) => (
                            <span
                                onClick={() => navigate(item.absolutePath)}
                                key={index}
                                className={[
                                    styles.navigationItem,
                                    location.pathname === item.absolutePath
                                        ? styles.navigationItemSelected
                                        : null,
                                ].join(' ')}
                            >
                                {item.text}
                            </span>
                        ))}
                    </div>
                    <Routes>
                        {navigationItems.map((item, index) => (
                            <Route
                                key={index}
                                path={item.relativePath}
                                element={item.element}
                            />
                        ))}
                        <Route
                            path='*'
                            element={<Navigate to='/account/information' />}
                        />
                    </Routes>
                </div>
            </div>
        </PageWithNavBar>
    )
}

export default AccountPage
