import React from 'react'
import styles from './History.module.css'
import Order from './Order/Order'
import Filters from '../Filters/Filters'
import Pagination from '../Pagination/Pagination'
import Content from '../Content/Content'

const History: React.FC = () => {
    const orders = [
        {
            number: 100,
            date: '02.01.2024',
        },
        {
            number: 100,
            date: '02.01.2024',
        },
        {
            number: 100,
            date: '02.01.2024',
        },
    ]

    return (
        <Content title='история покупок'>
            <div className={styles.history}>
                <Filters />
                <span className={styles.title}>магазин</span>
                <Pagination minPage={1} maxPage={10} currentPage={1}>
                    {orders.map((item, index) => (
                        <Order
                            key={index}
                            number={item.number}
                            date={item.date}
                        />
                    ))}
                </Pagination>
            </div>
        </Content>
    )
}

export default History
