import React, { useEffect, useState } from 'react'
import PageTemplate from '../../components/PageTemplate/PageTemplate'
import styles from './CollectionsPage.module.css'
import logoPlaceholder from '../../assets/images/placeholder.jpg'
import Image from './Image/Image'
import FirstCollectionImage from '../../assets/images/collection_1.png'
import SecondCollectionImage from '../../assets/images/collection_2.png'
import ThirdCollectionImage from '../../assets/images/collection_3.png'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { getProducts } from '../../api/products'

interface ICollection {
    id: 1
    name: string
    price: 0.0
    collection: string
    created_at: string
    updated_at: string
    image: string
}

interface ICollections {
    [category: string]: Array<ICollection>
}

const CollectionsPage: React.FC = () => {
    const products = useAppSelector((state) => state.products)
    const dispatch = useAppDispatch()

    const [productsList, setProductsList] = useState<ICollections>({})

    useEffect(() => {
        dispatch(getProducts())
    }, [])

    useEffect(() => {
        if (!products.getProducts.loading && products.getProducts.result) {
            setProductsList(
                [...products.getProducts.result].reduce((obj: any, item) => {
                    if (!obj[item.category]) {
                        obj[item.category] = []
                    }

                    obj[item.category].push(item)

                    return obj
                }, {})
            )
        }
    }, [products.getProducts.loading])

    const splitArray = (array: Array<ICollection>) => {
        const result = []
        for (let i = 0; i < array.length; i += 3) {
            result.push(array.slice(i, i + 3))
        }
        return result
    }

    return (
        <PageTemplate backgroundImages={[logoPlaceholder]}>
            <div className={styles.collectionsPage}>
                {Object.entries(productsList).map((collection) => (
                    <div className={styles.collectionBlock}>
                        <span className={styles.title}>{collection[0]}</span>
                        <div className={styles.imagesBlock}>
                            {splitArray(collection[1]).map(
                                (splitCollection) => (
                                    <div className={styles.goodsBlock}>
                                        {splitCollection.map((item) => (
                                            <Image
                                                name={item.name}
                                                price={item.price}
                                                image={FirstCollectionImage}
                                            />
                                        ))}
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </PageTemplate>
    )
}

export default CollectionsPage
