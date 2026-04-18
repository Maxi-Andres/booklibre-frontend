import axios, { type InternalAxiosRequestConfig } from "axios"
import customAxios from "./customAxios"

const authInterceptor = (config: InternalAxiosRequestConfig) => {
    const stored = localStorage.getItem('user') || sessionStorage.getItem('user')
    if (stored) {
        const { accessToken } = JSON.parse(stored)
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`
        }
    }
    return config
}

axios.interceptors.request.use(authInterceptor)
customAxios.interceptors.request.use(authInterceptor)