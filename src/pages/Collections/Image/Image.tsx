import React from 'react'
import styles from './Image.module.css'

interface IImageProps {
    name: string
    price?: number
    image: string
}

const Image: React.FC<IImageProps> = ({ name, price, image }) => {
    return (
        <div
            style={{
                backgroundImage: `url(${image})`,
            }}
            className={styles.image}
        >
            <span className={styles.name}>{name}</span>
            <div className={styles.priceBlock}>
                <span className={styles.price}>{price}</span>₽
            </div>
        </div>
    )
}

export default Image
