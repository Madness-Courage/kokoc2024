import React from 'react'
import styles from './Information.module.css'
import PlaceholderImage from '../../../assets/images/placeholder_4.jpg'
import DownArrowIcon from '../../../assets/icons/down-arrow.svg'

const Information: React.FC = () => {
    return (
        <div className={styles.information}>
            <div className={styles.topBlock}>
                <img
                    className={styles.image}
                    src={PlaceholderImage}
                    alt='PlaceholderImage'
                />
                <div className={styles.inputsBlock}>
                    <div className={styles.inputBlock}>
                        <span className={styles.inputTitle}>Имя</span>
                        <input
                            placeholder='Александр'
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.inputBlock}>
                        <span className={styles.inputTitle}>
                            Номер телефона
                        </span>
                        <input
                            placeholder='+79650000'
                            className={styles.input}
                        />
                    </div>
                </div>
            </div>
            <div className={styles.inputBlock}>
                <span className={styles.inputTitle}>Адрес</span>
                <input placeholder='Адрес' className={styles.input} />
            </div>
            <div className={styles.inputBlock}>
                <span className={styles.inputTitle}>Пароль</span>
                <input
                    placeholder='****************'
                    className={styles.input}
                />
            </div>
            <div className={styles.bottomBlock}>
                <span className={styles.inputTitle}>Предпочтения</span>
                <div className={styles.selectsBlock}>
                    <select
                        className={styles.select}
                        style={{
                            backgroundImage: `url(${DownArrowIcon})`,
                        }}
                    >
                        <option value='category'>Категория</option>
                    </select>
                    <select
                        className={styles.select}
                        style={{
                            backgroundImage: `url(${DownArrowIcon})`,
                        }}
                    >
                        <option value='category'>Категория</option>
                    </select>
                    <select
                        className={styles.select}
                        style={{
                            backgroundImage: `url(${DownArrowIcon})`,
                        }}
                    >
                        <option value='category'>Категория</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

export default Information
