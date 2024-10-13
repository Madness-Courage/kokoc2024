import React from 'react'
import styles from './Match.module.css'
import { ReactComponent as InfoIcon } from '../../../../assets/icons/info.svg'
import { ReactComponent as DownloadIcon } from '../../../../assets/icons/download.svg'

interface MatchProps {
    number: number
    date: string
}

const Match: React.FC<MatchProps> = ({ number, date }) => {
    return (
        <div className={styles.match}>
            <div className={styles.leftBlock}>
                <span className={styles.title}>Заказ № {number}</span>
                <span className={styles.date}>{date}</span>
            </div>
            <div className={styles.rightBlock}>
                <InfoIcon />
                <div className={styles.detailsButton}>
                    <span>скачать билет</span>
                    <DownloadIcon />
                </div>
            </div>
        </div>
    )
}

export default Match
