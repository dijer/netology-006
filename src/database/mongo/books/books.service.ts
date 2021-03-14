import { injectable } from "inversify";
import Book from './books.model';
import IBooksService, { IBookData } from '../../../books/books.service.interface';

@injectable()
export default class BooksService implements IBooksService {
    constructor() {
        console.log('new BooksService');
    }

    async createBook({
        title,
        description,
        authors,
        favorite,
        fileCover,
        fileName,
    }: IBookData) {
        const book = new Book({
            title,
            description,
            authors,
            favorite,
            fileCover,
            fileName,
        });
        await book.save();
        return book;
    }

    async getBook(id: string) {
        const book = await Book.findById(id);
        return book;
    }

    async getBooks() {
        const books = await Book.find();
        return books;
    }

    async updateBook(id: string, {
        title,
        description,
        authors,
        favorite,
        fileCover,
        fileName,
    }: IBookData) {
        try {
            const book = await Book.findByIdAndUpdate(id, {
                title,
                description,
                authors,
                favorite,
                fileCover,
                fileName,
            });
            return book;
        } catch (e) {
            throw new Error(e);
        }
    }

    async deleteBook(id: string)  {
        try {
            await Book.deleteOne({ _id: id });
        } catch (e) {
            throw new Error(e);
        }
    }
}
