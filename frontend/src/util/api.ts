import type { IBackendRes, IAccount, IUser, ICourse, INote } from '../types/backend';
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

/**
 * 
Module Note
 */
export const callCreateNote = (payload: {
  title: string;
  content?: string;
  userId: number;
  courseId: number;
  imageUrl?: string;
}) => {
  return axios.post<IBackendRes<INote>>('/api/v1/notes', payload);
};

export const callGetNotesByCourse = (courseId: number) => {
  return axios.get<IBackendRes<INote[]>>(`/api/v1/notes/course/${courseId}`);
}

export const callUpdateNote = (id: number, title?: string, content?: string, imageUrl?: string) => {
  return axios.patch<IBackendRes<INote>>(`/api/v1/notes/${id}`, {title, content, imageUrl});
}

export const callDeleteNote = (id: number) => {
  return axios.delete<IBackendRes<string>>(`/api/v1/notes/${id}`);
}