import React from 'react'
import styles from './Subscriptions.module.css'
import Subscription from './Subscription/Subscription'
import Content from '../Content/Content'

const Subscriptions: React.FC = () => {
    const activeSubscriptions = [
        {
            name: 'Подписка 1',
            status: 'Ваша подписка активна',
            startDate: '01.01.2024',
            endDate: '02.01.2024',
        },
        {
            name: 'Подписка 1',
            status: 'Ваша подписка активна',
            startDate: '01.01.2024',
            endDate: '02.01.2024',
        },
        {
            name: 'Подписка 1',
            status: 'Ваша подписка активна',
            startDate: '01.01.2024',
            endDate: '02.01.2024',
        },
    ]

    const inactiveSubscriptions = [
        {
            name: 'Подписка 1',
            status: 'Ваша подписка активна',
            startDate: '01.01.2024',
            endDate: '02.01.2024',
        },
        {
            name: 'Подписка 1',
            status: 'Ваша подписка активна',
            startDate: '01.01.2024',
            endDate: '02.01.2024',
        },
        {
            name: 'Подписка 1',
            status: 'Ваша подписка активна',
            startDate: '01.01.2024',
            endDate: '02.01.2024',
        },
    ]

    return (
        <Content title='подписки'>
            <div className={styles.subscriptions}>
                <div className={styles.subscriptionsBlock}>
                    <span className={styles.title}>активные подписки</span>
                    {activeSubscriptions.map((item, index) => (
                        <Subscription
                            name={item.name}
                            status={item.status}
                            startDate={item.startDate}
                            endDate={item.endDate}
                            active
                        />
                    ))}
                </div>
                <div className={styles.subscriptionsBlock}>
                    <span className={styles.title}>неактивные подписки</span>
                    {activeSubscriptions.map((item, index) => (
                        <Subscription
                            name={item.name}
                            status={item.status}
                            startDate={item.startDate}
                            endDate={item.endDate}
                        />
                    ))}
                </div>
            </div>
        </Content>
    )
}

export default Subscriptions
