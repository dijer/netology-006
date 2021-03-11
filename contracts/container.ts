import { Container } from 'inversify';
import BookRepository from './book.repository';

const container = new Container();

container.bind(BookRepository).toSelf();

export default container;