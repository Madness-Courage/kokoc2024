import { createAsyncThunk } from '@reduxjs/toolkit'
import axios, { getStringFromAxiosError } from '../utils/axios'
import {
    setAccessToken,
    setAuthorized,
    setRefreshToken,
} from '../store/slices/dataSlice'
import axiosPackage from 'axios'
import { RootState } from '../store/store'

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
                'http://localhost:3000/api/users/register',
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
                'http://localhost:3000/api/users/login',
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

export interface IRefreshTokenResult {
    accessToken: string
}

export const refreshToken = createAsyncThunk(
    'users/refresh-token',
    async (data, thunkApi) => {
        try {
            const state = thunkApi.getState() as RootState
            const response = await axios.post<IRefreshTokenResult>(
                'http://localhost:3000/api/users/refresh-token',
                {
                    refreshToken: state.data.refreshToken,
                }
            )
            thunkApi.dispatch(setAccessToken(response.data.accessToken))
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

export interface IGetProfileError {
    error: string
}

export const getProfile = createAsyncThunk(
    'users/profile',
    async (data, thunkApi) => {
        try {
            const response = await axios.get<IGetProfileResult>(
                'http://localhost:3000/api/users/profile'
            )
            return thunkApi.fulfillWithValue(response.data)
        } catch (error) {
            if (
                axiosPackage.isAxiosError<IGetProfileError>(error) &&
                error.response?.data.error === 'Invalid token'
            ) {
                thunkApi.dispatch(refreshToken())
            }

            return thunkApi.rejectWithValue(getStringFromAxiosError(error))
        }
    }
)

export interface IUpdateProfileData {
    photo: {}
    full_name: string
    username: string
    password: string
    email: string
    phone: string
}

export const updateProfile = createAsyncThunk(
    'users/profile/update',
    async (data: IUpdateProfileData, thunkApi) => {
        try {
            const response = await axios.put<IGetProfileResult>(
                'http://localhost:3000/api/users/profile',
                data
            )
            return thunkApi.fulfillWithValue(response.data)
        } catch (error) {
            if (
                axiosPackage.isAxiosError<IGetProfileError>(error) &&
                error.response?.data.error === 'Invalid token'
            ) {
                thunkApi.dispatch(refreshToken())
            }

            return thunkApi.rejectWithValue(getStringFromAxiosError(error))
        }
    }
)
