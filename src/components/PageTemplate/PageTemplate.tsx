import React, { useEffect, useRef } from 'react'
import styles from './PageTemplate.module.css'
import NavBar from '../NavBar/NavBar'

interface PageTemplateProps {
    backgroundImage: string
    children: React.ReactNode
}

const PageTemplate: React.FC<PageTemplateProps> = ({
    backgroundImage,
    children,
}) => {
    const contentRef = useRef<HTMLDivElement>(null) // Создаем реф для контентного блока

    const handleScroll = () => {
        if (contentRef.current) {
            // Получаем положение верхней границы контентного блока относительно верхней части экрана
            const contentTop = contentRef.current.getBoundingClientRect().top
            // Высчитываем радиус скругления и прозрачность в зависимости от положения контента
            const borderRadius = Math.max(
                0,
                Math.min(30, (contentTop - 70) / 10)
            )
            // 70 — высота NavBar
            const navbarOpacity = contentTop < 70 ? 1 : 0 // Прозрачность от 0 до 1
            const overlayOpacity = Math.min(
                0.5 + (570 - contentTop) / 1200,
                0.8
            ) // Затемнение картинки

            // Устанавливаем значения CSS-переменных
            document.documentElement.style.setProperty(
                '--border-radius',
                `${borderRadius}px`
            )
            document.documentElement.style.setProperty(
                '--navbar-bg',
                `rgba(255, 255, 255, ${navbarOpacity})`
            )
            document.documentElement.style.setProperty(
                '--overlay-opacity',
                `${overlayOpacity}`
            )
        }
    }

    useEffect(() => {
        // Устанавливаем значения по умолчанию для переменных
        document.documentElement.style.setProperty('--border-radius', '30px')
        document.documentElement.style.setProperty(
            '--navbar-bg',
            'rgba(255, 255, 255, 0)'
        )
        document.documentElement.style.setProperty('--overlay-opacity', '0.5')

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <>
            <NavBar />
            <div className={styles.pageContainer}>
                <div
                    className={styles.backgroundImage}
                    style={{
                        backgroundImage: `url(${backgroundImage})`,
                    }}
                >
                    {/* Затемняющий слой */}
                    <div className={styles.overlay} />
                </div>
                <div className={styles.content} ref={contentRef}>
                    {children}
                </div>
            </div>
        </>
    )
}

export default PageTemplate
