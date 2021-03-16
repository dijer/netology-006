import { IUser } from './users/users.interface';

declare global {
    namespace Express {
        export interface Request {
            user?: IUser;
            counter: number,
            files: any,
        }
        export interface Response {
            user: IUser;
        }
    }
}
