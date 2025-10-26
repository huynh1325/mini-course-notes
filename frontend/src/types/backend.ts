export interface IBackendRes<T> {
    error?: string | string[];
    message: string;
    statusCode: number | string;
    data?: T;
}

export interface IUser {
    id: number;
    username: string;
    password?: string;
    createdBy?: string;
    deletedAt?: boolean | null;
    createdAt?: string;
    updatedAt?: string;
}

export interface IAccount {
    access_token: string;
    user: IUser;
}
export interface IGetAccount extends Omit<IAccount, "access_token"> { }

export interface ICourse {
    id: number;
    name: string;
    description?: string;
    thumbnail: string;
    notes?: string;
    createdBy?: string;
    deletedAt?: boolean | null;
    createdAt?: string;
    updatedAt?: string;
}

export interface IMeta {
  current: number;
  pageSize: number;
  pages: number;
  total: number;
}

export interface INote {
  id: number;
  title: string;
  content: string;
  imageUrl: string;
  createdBy?: string;
  deletedAt?: boolean | null;
  createdAt?: string;
  updatedAt?: string;
  userId: number;
  courseId: number;
}

