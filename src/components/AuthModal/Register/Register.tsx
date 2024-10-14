import React, { useEffect, useState } from 'react'
import { register } from '../../../api/user'
import { ReactComponent as RightLongArrow } from '../../../assets/icons/right-long-arrow-white.svg'
import { setAuthModalLogin } from '../../../store/slices/dataSlice'
import { useAppDispatch, useAppSelector } from '../../../store/store'
import styles from './Register.module.css'

const Register: React.FC = () => {
    const user = useAppSelector((state) => state.user)

    const dispatch = useAppDispatch()

    const [nameText, setNameText] = useState<string | null>(null)
    const [usernameText, setUsernameText] = useState<string | null>(null)
    const [phoneText, setPhoneText] = useState<string | null>(null)
    const [emailText, setEmailText] = useState<string | null>(null)
    const [passwordText, setPasswordText] = useState<string | null>(null)
    const [repeatPasswordText, setRepeatPasswordText] = useState<string | null>(
        null
    )

    useEffect(() => {
        if (!user.register.loading && user.register.result) {
            dispatch(setAuthModalLogin(false))
        }
    }, [user.register.loading])

    const registerHandler = () => {
        if (
            nameText &&
            usernameText &&
            phoneText &&
            passwordText &&
            repeatPasswordText &&
            emailText
        ) {
            if (passwordText === repeatPasswordText) {
                dispatch(
                    register({
                        full_name: nameText,
                        username: usernameText,
                        phone: phoneText,
                        email: emailText,
                        password: passwordText,
                        photo: {},
                    })
                )
            }
        }
    }

    return (
        <>
            <div className={styles.inputsBlock}>
                <input
                    onChange={(e) =>
                        setNameText(
                            e.target.value === '' ? null : e.target.value
                        )
                    }
                    placeholder='Имя'
                    className={styles.input}
                />
                <input
                    onChange={(e) =>
                        setUsernameText(
                            e.target.value === '' ? null : e.target.value
                        )
                    }
                    placeholder='Имя пользователя'
                    className={styles.input}
                />
                <input
                    onChange={(e) =>
                        setPhoneText(
                            e.target.value === '' ? null : e.target.value
                        )
                    }
                    placeholder='Номер телефона'
                    className={styles.input}
                />
                <input
                    onChange={(e) =>
                        setEmailText(
                            e.target.value === '' ? null : e.target.value
                        )
                    }
                    placeholder='Почта'
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
                <input
                    onChange={(e) =>
                        setRepeatPasswordText(
                            e.target.value === '' ? null : e.target.value
                        )
                    }
                    type='password'
                    placeholder='Подтверждение пароля'
                    className={styles.input}
                />
            </div>
            <div onClick={registerHandler} className={styles.button}>
                продолжить
                <RightLongArrow />
            </div>
        </>
    )
}

export default Register
