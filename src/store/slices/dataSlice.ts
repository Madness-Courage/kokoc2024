import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IInitialState {
    authorized: boolean
    refreshToken: string | null
    accessToken: string | null
}

const initialState: IInitialState = {
    authorized: false,
    refreshToken: null,
    accessToken: null,
}

const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setAuthorized: (state, action: PayloadAction<boolean>) => {
            state.authorized = action.payload
        },
        setRefreshToken: (state, action: PayloadAction<string>) => {
            state.refreshToken = action.payload
        },
        setAccessToken: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload
        },
    },
})

export const { setAuthorized, setRefreshToken, setAccessToken } =
    dataSlice.actions
export default dataSlice
