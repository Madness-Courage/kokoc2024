import axios, { AxiosError } from 'axios'
import store from '../store/store'

export const getStringFromAxiosError = (error: any) => {
    if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError
        return axiosError.message
    } else {
        return 'Неизвестная ошибка'
    }
}

const axiosInstance = axios.create({
    withCredentials: true,
})

axiosInstance.interceptors.request.use(
    (config) => {
        const state = store.getState()
        const token = state.data.accessToken

        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default axiosInstance
