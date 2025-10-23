export interface IBackendRes<T> {
    error?: string | string[];
    message: string;
    statusCode: number | string;
    data?: T;
}

export interface IUser {
    id: string;
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
