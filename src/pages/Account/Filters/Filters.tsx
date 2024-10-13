import React from 'react'
import styles from './Filters.module.css'
import DownArrowIcon from '../../../assets/icons/down-arrow.svg'
import { ReactComponent as CloseIcon } from '../../../assets/icons/close.svg'

const Filters: React.FC = () => {
    return (
        <div className={styles.filters}>
            <select
                style={{
                    backgroundImage: `url(${DownArrowIcon})`,
                }}
                className={styles.filterInput}
            >
                <option value='category'>Категория</option>
            </select>
            <input type='date' className={styles.filterInput} />
            <div className={styles.filterButton}>
                <span className={styles.filterButtonText}>Отчистить</span>
                <CloseIcon />
            </div>
        </div>
    )
}

export default Filters
