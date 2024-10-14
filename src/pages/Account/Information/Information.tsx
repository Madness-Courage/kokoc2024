import React, { useEffect, useState } from 'react'
import { getProfile, updateProfile } from '../../../api/user'
import DownArrowIcon from '../../../assets/icons/down-arrow.svg'
import PlaceholderImage from '../../../assets/images/placeholder_4.jpg'
import { useAppDispatch, useAppSelector } from '../../../store/store'
import styles from './Information.module.css'
import Content from '../Content/Content'

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
        if (!user.refreshToken.loading && user.refreshToken.result) {
            dispatch(getProfile())
        }
    }, [user.refreshToken.loading])

    useEffect(() => {
        if (!user.getProfile.loading && user.getProfile.result) {
            setNameText(user.getProfile.result.full_name)
            setPhoneText(user.getProfile.result.phone)
            setUsernameText(user.getProfile.result.username)
            setEmailText(user.getProfile.result.email)
        }
    }, [user.getProfile.loading])

    const updateProfileHandler = () => {
        if (nameText && phoneText && usernameText && emailText && passwordText) {
            dispatch(
                updateProfile({
                    full_name: nameText,
                    phone: phoneText,
                    email: emailText,
                    password: passwordText,
                    username: usernameText,
                    photo: {},
                })
            )
        }
    }

    return !user.getProfile.loading && user.getProfile.result ? (
        <Content editOnClick={updateProfileHandler} title='личная информация'>
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
                                value={nameText ?? undefined}
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
                                value={phoneText ?? undefined}
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
                        value={usernameText ?? undefined}
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
                        value={emailText ?? undefined}
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
        </Content>
    ) : null
}

export default Information
