// src/layouts/PageWithNavBar.tsx
import React from 'react'
import NavBar from '../components/NavBar/NavBar'
import Footer from '../components/Footer/Footer'

interface PageWithNavBarProps {
    children: React.ReactNode
}

const PageWithNavBar: React.FC<PageWithNavBarProps> = ({ children }) => {
    return (
        <>
            <NavBar />
            <div>{children}</div>
            <Footer />
        </>
    )
}

export default PageWithNavBar
