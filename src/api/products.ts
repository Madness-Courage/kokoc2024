import { createAsyncThunk } from '@reduxjs/toolkit'
import axios, { getStringFromAxiosError } from '../utils/axios'

interface IProduct {
    id: 1
    name: string
    price: 0.0
    category: string
    collection: string
    created_at: string
    updated_at: string
    image: string
}

export interface IGetProductsResult extends Array<IProduct> {}

export const getProducts = createAsyncThunk(
    'products/get',
    async (data, thunkApi) => {
        try {
            const response = await axios.get<IGetProductsResult>(
                'http://localhost:3005/api/products'
            )
            return thunkApi.fulfillWithValue(response.data)
        } catch (error) {
            return thunkApi.rejectWithValue(getStringFromAxiosError(error))
        }
    }
)
