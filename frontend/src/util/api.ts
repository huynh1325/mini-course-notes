import type { IBackendRes, IAccount, IUser, ICourse } from '../types/backend';
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

export const callRefreshToken = () => {
    return axios.get<IBackendRes<IAccount>>('/api/v1/auth/refresh')
}

export const callLogout = () => {
    return axios.post<IBackendRes<string>>('/api/v1/auth/logout')
}

/**
 * 
Module Course
 */
export const callGetCourses = (current = 1, pageSize = 5) => {
  return axios.get<IBackendRes<ICourse>>(`/api/v1/courses?current=${current}&pageSize=${pageSize}`)
};

export const callCreateCourse = (name: string, description: string, notes: string) => {
  return axios.post<IBackendRes<ICourse>>('/api/v1/courses', { name, description, notes })
};

export const callUpdateCourse = (id: number, name: string, description: string, notes: string) => {
  return axios.put<IBackendRes<ICourse>>(`/api/v1/courses/${id}`, { name, description, notes })
};

export const callDeleteCourse = (id: number) => {
  return axios.delete<IBackendRes<ICourse>>(`/api/v1/courses/${id}`)
};