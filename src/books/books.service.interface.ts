import { IBook } from './books.interface';

export interface IBookData {
    title: string;
    description: string;
    authors: string;
    favorite: string;
    fileCover: string;
    fileName: string;
};

export default abstract class IBooksService {
    abstract createBook(book: IBookData): Promise<IBook>;
    abstract getBook(id: string): Promise<IBook | null>;
    abstract getBooks(): Promise<IBook[]>;
    abstract updateBook(id: string, data: IBookData): Promise<IBook|null|Error>;
    abstract deleteBook(id: string): Promise<void>;
}