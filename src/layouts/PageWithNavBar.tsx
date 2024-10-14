// src/layouts/PageWithNavBar.tsx
import React from 'react'
import NavBar from '../components/NavBar/NavBar'
import Footer from '../components/Footer/Footer'
import styles from './PageWithNavBar.module.css'

interface PageWithNavBarProps {
    children: React.ReactNode
    dark?: boolean
}

const PageWithNavBar: React.FC<PageWithNavBarProps> = ({
    children,
    dark = false,
}) => {
    return (
        <>
            <NavBar dark={dark} />
            <div className={styles.page}>{children}</div>
            <Footer />
        </>
    )
}

export default PageWithNavBar
