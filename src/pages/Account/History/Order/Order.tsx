import React from 'react'
import styles from './Order.module.css'
import { ReactComponent as InfoIcon } from '../../../../assets/icons/info.svg'
import { ReactComponent as RightLongArrowIcon } from '../../../../assets/icons/right-long-arrow.svg'

interface OrderProps {
    number: number
    date: string
}

const Order: React.FC<OrderProps> = ({ number, date }) => {
    return (
        <div className={styles.order}>
            <div className={styles.leftBlock}>
                <span className={styles.title}>Заказ № {number}</span>
                <span className={styles.date}>{date}</span>
            </div>
            <div className={styles.rightBlock}>
                <InfoIcon />
                <div className={styles.detailsButton}>
                    <span>подробнее</span>
                    <RightLongArrowIcon />
                </div>
            </div>
        </div>
    )
}

export default Order
