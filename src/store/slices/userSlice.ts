import { createSlice } from '@reduxjs/toolkit'
import {
    getProfile,
    IGetProfileResult,
    ILoginResult,
    IRefreshTokenResult,
    IRegisterResult,
    login,
    refreshToken,
    register,
} from '../../api/user'

interface IInitialState {
    register: {
        loading: boolean
        result: IRegisterResult | null
        error: string | null
    }
    login: {
        loading: boolean
        result: ILoginResult | null
        error: string | null
    }
    getProfile: {
        loading: boolean
        result: IGetProfileResult | null
        error: string | null
    }
    refreshToken: {
        loading: boolean
        result: IRefreshTokenResult | null
        error: string | null
    }
}

const initialState: IInitialState = {
    register: {
        loading: false,
        result: null,
        error: null,
    },
    login: {
        loading: false,
        result: null,
        error: null,
    },
    getProfile: {
        loading: false,
        result: null,
        error: null,
    },
    refreshToken: {
        loading: false,
        result: null,
        error: null,
    },
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.register.loading = true
            })
            .addCase(register.rejected, (state, action) => {
                state.register.loading = false
                state.register.error = action.payload as string
                state.register.result = null
            })
            .addCase(register.fulfilled, (state, action) => {
                state.register.loading = false
                state.register.result = action.payload
            })

        builder
            .addCase(login.pending, (state) => {
                state.login.loading = true
            })
            .addCase(login.rejected, (state, action) => {
                state.login.loading = false
                state.login.error = action.payload as string
                state.login.result = null
            })
            .addCase(login.fulfilled, (state, action) => {
                state.login.loading = false
                state.login.result = action.payload
            })

        builder
            .addCase(getProfile.pending, (state) => {
                state.getProfile.loading = true
            })
            .addCase(getProfile.rejected, (state, action) => {
                state.getProfile.loading = false
                state.getProfile.error = action.payload as string
                state.getProfile.result = null
            })
            .addCase(getProfile.fulfilled, (state, action) => {
                state.getProfile.loading = false
                state.getProfile.result = action.payload
            })

        builder
            .addCase(refreshToken.pending, (state) => {
                state.refreshToken.loading = true
            })
            .addCase(refreshToken.rejected, (state, action) => {
                state.refreshToken.loading = false
                state.refreshToken.error = action.payload as string
                state.refreshToken.result = null
            })
            .addCase(refreshToken.fulfilled, (state, action) => {
                state.refreshToken.loading = false
                state.refreshToken.result = action.payload
            })
    },
})

export default userSlice
