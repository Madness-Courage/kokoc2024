import React from 'react'
import styles from './Matches.module.css'
import Match from './Match/Match'
import Filters from '../Filters/Filters'
import Pagination from '../Pagination/Pagination'

const Matches: React.FC = () => {
    const matches = [
        {
            number: 1,
            date: '02.01.2024',
        },
        {
            number: 2,
            date: '02.01.2024',
        },
        {
            number: 3,
            date: '02.01.2024',
        },
    ]

    return (
        <div className={styles.matches}>
            <Filters />
            <span className={styles.title}>матчи</span>
            <Pagination minPage={1} maxPage={10} currentPage={1}>
                {matches.map((item, index) => (
                    <Match key={index} number={item.number} date={item.date} />
                ))}
            </Pagination>
        </div>
    )
}

export default Matches
