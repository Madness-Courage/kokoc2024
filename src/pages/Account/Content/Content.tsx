import React from 'react'
import styles from './Content.module.css'
import { ReactComponent as EditIcon } from '../../../assets/icons/edit.svg'

interface IContentProps {
    title: string
    children: React.ReactNode
    editOnClick?: React.MouseEventHandler<HTMLDivElement>
}

const Content: React.FC<IContentProps> = ({ title, editOnClick, children }) => {
    return (
        <div className={styles.content}>
            <div className={styles.titleBlock}>
                <span className={styles.title}>{title}</span>
                <div onClick={editOnClick} className={styles.editButton}>
                    <span>редактировать</span>
                    <EditIcon />
                </div>
            </div>
            {children}
        </div>
    )
}

export default Content
