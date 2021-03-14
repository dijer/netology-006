import { injectable } from "inversify";
import IUsersService, { IUserData } from '../../../users/users.service.interface';
import User from './users.model';

@injectable()
export default class UsersService implements IUsersService {
    constructor() {
        console.log('new UsersService');
    }

    async createUser({ username, password }: IUserData) {
        try {
            const user = new User({
                password,
                username,
            });
            await user.save();
            return user;
        } catch (e) {
            throw new Error(e);
        }
    }
}
