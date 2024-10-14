import { createSlice } from '@reduxjs/toolkit'
import { getProducts, IGetProductsResult } from '../../api/products'

interface IInitialState {
    getProducts: {
        loading: boolean
        result: IGetProductsResult | null
        error: string | null
    }
}

const initialState: IInitialState = {
    getProducts: {
        loading: false,
        result: null,
        error: null,
    },
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.getProducts.loading = true
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.getProducts.loading = false
                state.getProducts.error = action.payload as string
                state.getProducts.result = null
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.getProducts.loading = false
                state.getProducts.result = action.payload
            })
    },
})

export default productsSlice
