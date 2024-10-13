import React from 'react'
import Filters from '../Filters/Filters'
import PlaceholderImage from '../../../assets/images/placeholder_4.jpg'
import styles from './Comments.module.css'
import Comment from './Comment/Comment'
import Pagination from '../Pagination/Pagination'

const Comments: React.FC = () => {
    const comments = [
        {
            date: '02.01.2024, 12:00',
            names: 'Александр Алексеев',
            text: 'Содержание комментария о статье, посте или матче. Комментарий может быть вполне длинным, и даже на несколько строчек (но не более трех)',
            image: PlaceholderImage,
        },
        {
            date: '02.01.2024, 12:00',
            names: 'Александр Алексеев',
            text: 'Содержание комментария о статье, посте или матче. Комментарий может быть вполне длинным, и даже на несколько строчек (но не более трех)',
            image: PlaceholderImage,
        },
        {
            date: '02.01.2024, 12:00',
            names: 'Александр Алексеев',
            text: 'Содержание комментария о статье, посте или матче. Комментарий может быть вполне длинным, и даже на несколько строчек (но не более трех)',
            image: PlaceholderImage,
        },
    ]

    return (
        <div className={styles.comments}>
            <Filters />
            <Pagination minPage={1} maxPage={10} currentPage={1}>
                {comments.map((item, index) => (
                    <Comment
                        key={index}
                        date={item.date}
                        names={item.names}
                        text={item.text}
                        image={item.image}
                    />
                ))}
            </Pagination>
        </div>
    )
}

export default Comments
