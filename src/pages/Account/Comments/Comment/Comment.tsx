import React from 'react'
import styles from './Comment.module.css'
import { ReactComponent as RightLongArrowIcon } from '../../../../assets/icons/right-long-arrow.svg'

interface CommentProps {
    date: string
    image: string
    names: string
    text: string
}

const Comment: React.FC<CommentProps> = ({ date, image, names, text }) => {
    return (
        <div className={styles.comment}>
            <div className={styles.topBlock}>
                <span className={styles.date}>{date}</span>
                <RightLongArrowIcon />
            </div>
            <div className={styles.bottomBlock}>
                <img className={styles.image} src={image} alt={image} />
                <div className={styles.textsBlock}>
                    <span className={styles.names}>{names}</span>
                    <span className={styles.text}>{text}</span>
                </div>
            </div>
        </div>
    )
}

export default Comment
