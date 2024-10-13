import React from 'react'
import PageTemplate from '../../components/PageTemplate/PageTemplate'
import styles from './AboutPage.module.css'
import logoPlaceholder from '../../assets/images/placeholder.jpg'

const AboutPage: React.FC = () => {
    return (
        <PageTemplate backgroundImages={[logoPlaceholder]}>
            <div className={styles.aboutPage}>
                <span className={styles.title}>история клуба</span>
                <span className={styles.title}>информация о стадионе</span>
                <span className={styles.title}>партнеры</span>
                <span className={styles.title}>спонсоры</span>
            </div>
        </PageTemplate>
    )
}

export default AboutPage
