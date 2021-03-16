import { Container } from 'inversify';
import BooksService from './database/mongo/books/books.service';
import IBooksService from './books/books.service.interface';
import UsersService from './database/mongo/users/users.service';
import IUsersService from './users/users.service.interface';

const container = new Container();

container.bind(IBooksService).to(BooksService).inSingletonScope();
container.bind(IUsersService).to(UsersService).inSingletonScope();

export default container;