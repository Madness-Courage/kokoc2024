import React from 'react'
import styles from './Subscription.module.css'
import { ReactComponent as InfoIcon } from '../../../../assets/icons/info.svg'

interface SubscriptionProps {
    name: string
    status: string
    startDate: string
    endDate: string
    active?: boolean
}

const Subscription: React.FC<SubscriptionProps> = ({
    name,
    status,
    startDate,
    endDate,
    active = false,
}) => {
    return (
        <div className={styles.subscription}>
            <div className={styles.leftBlock}>
                <span className={styles.name}>{name}</span>
                <span className={styles.status}>{status}</span>
                <span className={styles.date}>
                    {startDate} - {endDate}
                </span>
            </div>
            <div className={styles.rightBlock}>
                <InfoIcon />
                <div
                    className={[
                        styles.button,
                        active ? styles.activeButton : styles.cancelButton,
                    ].join(' ')}
                >
                    {active ? 'отменить подписку' : 'возобновить подписку'}
                </div>
            </div>
        </div>
    )
}

export default Subscription
