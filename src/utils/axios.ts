import axios, { AxiosError } from 'axios'

export const getStringFromAxiosError = (error: any) => {
    if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError
        return axiosError.message
    } else {
        return 'Неизвестная ошибка'
    }
}

export default axios.create({
    withCredentials: true,
})
