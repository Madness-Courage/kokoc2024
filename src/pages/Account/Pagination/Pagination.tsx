import React from 'react'
import styles from './Pagination.module.css'

interface PaginationProps {
    minPage: number
    currentPage: number
    maxPage: number
    children: React.ReactNode
}

const Pagination: React.FC<PaginationProps> = ({
    minPage,
    maxPage,
    currentPage,
    children,
}) => {
    const array = Array.from(
        { length: maxPage - minPage + 1 },
        (item, index) => minPage + index
    )

    return (
        <div className={styles.pagination}>
            {children}
            <div className={styles.pagesBlock}>
                {array.map((item) => (
                    <span>{item}</span>
                ))}
            </div>
        </div>
    )
}

export default Pagination
