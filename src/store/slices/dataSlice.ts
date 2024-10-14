import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IInitialState {
    authorized: boolean
    refreshToken: string | null
    accessToken: string | null
    showAuthModal: boolean
    authModalLogin: boolean
}

const initialState: IInitialState = {
    authorized: false,
    refreshToken: null,
    accessToken: null,
    showAuthModal: false,
    authModalLogin: false,
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
        setShowAuthModal: (state, action: PayloadAction<boolean>) => {
            state.showAuthModal = action.payload
        },
        setAuthModalLogin: (state, action: PayloadAction<boolean>) => {
            state.authModalLogin = action.payload
        },
    },
})

export const {
    setAuthorized,
    setRefreshToken,
    setAccessToken,
    setShowAuthModal,
    setAuthModalLogin,
} = dataSlice.actions
export default dataSlice
