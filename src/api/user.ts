import { createAsyncThunk } from '@reduxjs/toolkit'
import axios, { getStringFromAxiosError } from '../utils/axios'
import {
    setAccessToken,
    setAuthorized,
    setRefreshToken,
} from '../store/slices/dataSlice'

export interface IRegisterData {
    photo: {}
    full_name: string
    username: string
    password: string
    email: string
    phone: string
}

export interface IRegisterResult {
    id: number
    photo: null
    full_name: string
    username: string
    password_hash: string
    email: string
    phone: string
    created_at: string
    updated_at: string
    reset_code: null
    reset_code_expires: null
    admin: boolean
}

export const register = createAsyncThunk(
    'users/register',
    async (data: IRegisterData, thunkApi) => {
        try {
            const response = await axios.post<IRegisterResult>(
                'http://127.0.0.1:3000/users/register',
                data
            )
            return thunkApi.fulfillWithValue(response.data)
        } catch (error) {
            return thunkApi.rejectWithValue(getStringFromAxiosError(error))
        }
    }
)

export interface ILoginData {
    username: string
    password: string
}

export interface ILoginResult {
    accessToken: string
    refreshToken: string
}

export const login = createAsyncThunk(
    'users/login',
    async (data: ILoginData, thunkApi) => {
        try {
            const response = await axios.post<ILoginResult>(
                'http://127.0.0.1:3000/users/login',
                data
            )
            thunkApi.dispatch(setAuthorized(true))
            thunkApi.dispatch(setAccessToken(response.data.accessToken))
            thunkApi.dispatch(setRefreshToken(response.data.refreshToken))
            return thunkApi.fulfillWithValue(response.data)
        } catch (error) {
            return thunkApi.rejectWithValue(getStringFromAxiosError(error))
        }
    }
)

export interface IGetProfileResult {
    id: number
    photo: null
    full_name: string
    username: string
    password_hash: string
    email: string
    phone: string
    created_at: string
    updated_at: string
    reset_code: null
    reset_code_expires: null
    admin: boolean
}

export const getProfile = createAsyncThunk(
    'users/profile',
    async (data, thunkApi) => {
        try {
            const response = await axios.get<IGetProfileResult>(
                'http://127.0.0.1:3000/users/profile'
            )
            return thunkApi.fulfillWithValue(response.data)
        } catch (error) {
            return thunkApi.rejectWithValue(getStringFromAxiosError(error))
        }
    }
)
