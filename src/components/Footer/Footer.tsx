import React, { useEffect, useRef, useState } from 'react'
import tg from '../../assets/icons/tg.svg'
import vk from '../../assets/icons/vk.svg'
import logo from '../../assets/images/white-logo.svg'
import styles from './Footer.module.scss'
import { navigationItems } from '../../config/navigation'

const Footer: React.FC = () => {
    const [logoGap, setLogoGap] = useState(0)

    const firstRef = useRef<HTMLDivElement | null>(null)
    const secondRef = useRef<HTMLDivElement | null>(null)

    const resizeHandler = () => {
        if (firstRef.current && secondRef.current) {
            setLogoGap(
                secondRef.current?.getBoundingClientRect().left -
                    firstRef.current?.getBoundingClientRect().right
            )
        }
    }

    useEffect(() => {
        resizeHandler()
        window.addEventListener('resize', resizeHandler)
        return () => window.removeEventListener('resize', resizeHandler)
    }, [])

    return (
        <div
            style={{
                gap: logoGap,
            }}
            className={[styles.footer, styles.block].join(' ')}
        >
            <div className={[styles.logoBlock, styles.block].join(' ')}>
                <img src={logo} alt='logo' />
                <span>
                    Официальный сайт
                    <br />
                    Футбольного клуба
                    <br />
                    «Кокос групп»
                </span>
            </div>
            <div className={[styles.infoBlock, styles.block].join(' ')}>
                <div
                    ref={firstRef}
                    className={[styles.linksBlock, styles.block].join(' ')}
                >
                    {navigationItems.map((item) => (
                        <a href={item.path}>{item.name}</a>
                    ))}
                </div>
                <div
                    ref={secondRef}
                    className={[styles.linksBlock, styles.block].join(' ')}
                >
                    <span>Билеты</span>
                    <span>Клуб</span>
                    <span>Магазин</span>
                </div>
                <div className={[styles.linksBlock, styles.block].join(' ')}>
                    <span>Билеты</span>
                    <span>Клуб</span>
                    <span>Магазин</span>
                </div>
                <div className={[styles.linksBlock, styles.block].join(' ')}>
                    <span>Адрес</span>
                    <span>xxx</span>
                </div>
                <div className={[styles.linksBlock, styles.block].join(' ')}>
                    <span>Телефон</span>
                    <span>xxx</span>
                </div>
                <div className={[styles.iconsBlock, styles.block].join(' ')}>
                    <img src={vk} alt='vk' />
                    <img src={tg} alt='tg' />
                </div>
            </div>
        </div>
    )
}

export default Footer
