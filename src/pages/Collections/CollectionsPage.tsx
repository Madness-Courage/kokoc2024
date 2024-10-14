import React from 'react'
import PageTemplate from '../../components/PageTemplate/PageTemplate'
import styles from './CollectionsPage.module.css'
import logoPlaceholder from '../../assets/images/placeholder.jpg'
import Image from './Image/Image'
import FirstCollectionImage from '../../assets/images/collection_1.png'
import SecondCollectionImage from '../../assets/images/collection_2.png'
import ThirdCollectionImage from '../../assets/images/collection_3.png'

const CollectionsPage: React.FC = () => {
    return (
        <PageTemplate backgroundImages={[logoPlaceholder]}>
            <div className={styles.collectionsPage}>
                <div className={styles.collectionBlock}>
                    <span className={styles.title}>хиты продаж</span>
                    <div
                        className={[
                            styles.imagesBlock,
                            styles.firstImagesBlock,
                        ].join(' ')}
                    >
                        <div className={styles.goodsBlock}>
                            <Image
                                name='Футболка'
                                price={1999}
                                image={FirstCollectionImage}
                            />
                        </div>
                        <div className={styles.goodsBlock}>
                            <Image
                                name='Футболка'
                                price={1999}
                                image={SecondCollectionImage}
                            />
                            <Image
                                name='Футболка'
                                price={1999}
                                image={ThirdCollectionImage}
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.collectionBlock}>
                    <span className={styles.title}>коллекции</span>
                    <div
                        className={[
                            styles.imagesBlock,
                            styles.secondImagesBlock,
                        ].join(' ')}
                    >
                        <div
                            className={[
                                styles.goodsBlock,
                                styles.firstGoodsBlock,
                            ].join(' ')}
                        >
                            <Image
                                name='Футболка'
                                price={1999}
                                image={FirstCollectionImage}
                            />
                            <div className={styles.textsBlock}>
                                <span className={styles.title}>
                                    Коллекция 1 —
                                </span>
                                <span className={styles.subtitle}>
                                    Описание коллекции
                                </span>
                            </div>
                        </div>
                        <div className={styles.goodsBlock}>
                            <Image
                                name='Футболка'
                                price={1999}
                                image={ThirdCollectionImage}
                            />
                            <Image
                                name='Футболка'
                                price={1999}
                                image={ThirdCollectionImage}
                            />
                            <Image
                                name='Футболка'
                                price={1999}
                                image={ThirdCollectionImage}
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.collectionBlock}>
                    <span className={styles.title}>одежда</span>
                    <div className={styles.imagesBlock}>
                        <div className={styles.goodsBlock}>
                            <Image
                                name='Футболка'
                                price={1999}
                                image={ThirdCollectionImage}
                            />
                            <Image
                                name='Футболка'
                                price={1999}
                                image={ThirdCollectionImage}
                            />
                            <Image
                                name='Футболка'
                                price={1999}
                                image={ThirdCollectionImage}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </PageTemplate>
    )
}

export default CollectionsPage
