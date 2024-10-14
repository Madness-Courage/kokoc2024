import React, { useEffect, useState } from 'react'
import { getProfile } from '../../../api/user'
import DownArrowIcon from '../../../assets/icons/down-arrow.svg'
import PlaceholderImage from '../../../assets/images/placeholder_4.jpg'
import { useAppDispatch, useAppSelector } from '../../../store/store'
import styles from './Information.module.css'

const Information: React.FC = () => {
    const user = useAppSelector((state) => state.user)

    const [nameText, setNameText] = useState<string | null>(null)
    const [phoneText, setPhoneText] = useState<string | null>(null)
    const [usernameText, setUsernameText] = useState<string | null>(null)
    const [emailText, setEmailText] = useState<string | null>(null)
    const [passwordText, setPasswordText] = useState<string | null>(null)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getProfile())
    }, [])

    useEffect(() => {
        if (user.getProfile.loading && user.getProfile.result) {
            setNameText(user.getProfile.result.full_name)
            setPhoneText(user.getProfile.result.phone)
            setUsernameText(user.getProfile.result.username)
            setEmailText(user.getProfile.result.email)
        }
    }, [user.getProfile.loading])

    return !user.getProfile.loading && user.getProfile.result ? (
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
                            defaultValue={nameText ?? undefined}
                            onChange={(e) =>
                                setNameText(
                                    e.target.value === ''
                                        ? null
                                        : e.target.value
                                )
                            }
                            placeholder='Александр'
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.inputBlock}>
                        <span className={styles.inputTitle}>
                            Номер телефона
                        </span>
                        <input
                            onChange={(e) =>
                                setPhoneText(
                                    e.target.value === ''
                                        ? null
                                        : e.target.value
                                )
                            }
                            defaultValue={phoneText ?? undefined}
                            placeholder='+79650000'
                            className={styles.input}
                        />
                    </div>
                </div>
            </div>
            <div className={styles.inputBlock}>
                <span className={styles.inputTitle}>Имя пользователя</span>
                <input
                    onChange={(e) =>
                        setUsernameText(
                            e.target.value === '' ? null : e.target.value
                        )
                    }
                    defaultValue={usernameText ?? undefined}
                    placeholder='Имя пользователя'
                    className={styles.input}
                />
            </div>
            <div className={styles.inputBlock}>
                <span className={styles.inputTitle}>Почта</span>
                <input
                    onChange={(e) =>
                        setEmailText(
                            e.target.value === '' ? null : e.target.value
                        )
                    }
                    defaultValue={emailText ?? undefined}
                    placeholder='Почта'
                    className={styles.input}
                />
            </div>
            <div className={styles.inputBlock}>
                <span className={styles.inputTitle}>Пароль</span>
                <input
                    onChange={(e) =>
                        setPasswordText(
                            e.target.value === '' ? null : e.target.value
                        )
                    }
                    placeholder='Пароль'
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
    ) : null
}

export default Information
