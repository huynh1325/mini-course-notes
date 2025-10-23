import type { IBackendRes, IAccount, IUser, IGetAccount } from '../types/backend';
import axios from './axios-customize';

/**
 * 
Module Auth
 */
export const callRegister = (username: string, password: string) => {
    return axios.post<IBackendRes<IUser>>('/api/v1/auth/register', { username, password })
}

export const callLogin = (username: string, password: string) => {
    return axios.post<IBackendRes<IAccount>>('/api/v1/auth/login', { username, password })
}

export const callFetchAccount = () => {
    return axios.get<IBackendRes<IGetAccount>>('/api/v1/auth/account')
}

export const callRefreshToken = () => {
    return axios.get<IBackendRes<IAccount>>('/api/v1/auth/refresh')
}

export const callLogout = () => {
    return axios.post<IBackendRes<string>>('/api/v1/auth/logout')
}
