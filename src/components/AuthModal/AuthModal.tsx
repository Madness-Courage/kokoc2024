import React from 'react'
import LogoImage from '../../assets/images/logo.png'
import {
    setAuthModalLogin,
    setShowAuthModal,
} from '../../store/slices/dataSlice'
import { useAppDispatch, useAppSelector } from '../../store/store'
import styles from './AuthModal.module.css'
import Login from './Login/Login'
import Register from './Register/Register'

interface IAuthModalProps {
    show?: boolean
}

const AuthModal: React.FC<IAuthModalProps> = ({ show = false }) => {
    const data = useAppSelector((state) => state.data)

    const dispatch = useAppDispatch()

    return show ? (
        <div
            onClick={() => dispatch(setShowAuthModal(false))}
            className={styles.modal}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={styles.containerBlock}
            >
                <div className={styles.imageBlock}>
                    <img src={LogoImage} alt='LogoImage' />
                </div>
                <div className={styles.mainBlock}>
                    <div className={styles.switchBlock}>
                        <span
                            onClick={() => dispatch(setAuthModalLogin(true))}
                            className={[
                                styles.switchItem,
                                data.authModalLogin
                                    ? styles.switchSelectedItem
                                    : null,
                            ].join(' ')}
                        >
                            вход
                        </span>
                        <span
                            onClick={() => dispatch(setAuthModalLogin(false))}
                            className={[
                                styles.switchItem,
                                data.authModalLogin
                                    ? null
                                    : styles.switchSelectedItem,
                            ].join(' ')}
                        >
                            регистрация
                        </span>
                    </div>
                    {data.authModalLogin ? <Login /> : <Register />}
                </div>
            </div>
        </div>
    ) : null
}

export default AuthModal
