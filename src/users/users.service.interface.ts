import { IUser } from './users.interface';

export interface IUserData {
    username: string;
    password: string;
};

export default abstract class IUsersService {
    abstract createUser(data: IUserData): Promise<IUser>;
}