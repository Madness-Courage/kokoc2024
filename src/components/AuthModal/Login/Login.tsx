import React, { useEffect, useState } from 'react'
import styles from './Login.module.css'
import { ReactComponent as RightLongArrow } from '../../../assets/icons/right-long-arrow-white.svg'
import { useAppDispatch, useAppSelector } from '../../../store/store'
import { login } from '../../../api/user'
import { useNavigate } from 'react-router-dom'

const Login: React.FC = () => {
    const user = useAppSelector((state) => state.user)

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [usernameText, setUsernameText] = useState<string | null>(null)
    const [passwordText, setPasswordText] = useState<string | null>(null)

    const loginHandler = () => {
        if (usernameText && passwordText) {
            dispatch(
                login({
                    username: usernameText,
                    password: passwordText,
                })
            )
        }
    }

    useEffect(() => {
        if (!user.login.loading && user.login.result) {
            navigate('/account')
        }
    }, [user.login.loading])

    return (
        <>
            <div className={styles.inputsBlock}>
                <input
                    onChange={(e) =>
                        setUsernameText(
                            e.target.value === '' ? null : e.target.value
                        )
                    }
                    placeholder='Номер телефона'
                    className={styles.input}
                />
                <input
                    onChange={(e) =>
                        setPasswordText(
                            e.target.value === '' ? null : e.target.value
                        )
                    }
                    type='password'
                    placeholder='Пароль'
                    className={styles.input}
                />
            </div>
            <div onClick={loginHandler} className={styles.button}>
                войти
                <RightLongArrow />
            </div>
        </>
    )
}

export default Login
