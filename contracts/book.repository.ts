import { injectable } from "inversify";
import Book, { IBook } from '../models/Book';

export abstract class IBookRepository {
    abstract createBook: (book: IBook) => Promise<IBook>;
    abstract getBook: (id: string) => Promise<IBook>;
    abstract getBooks: () => Promise<IBook[]>;
    abstract updateBook: (id: string, data: IBook) => Promise<IBook>;
    abstract deleteBook: (id: string) => Promise<void>;
}

@injectable()
export default class BookRepository implements IBookRepository {
    async createBook(data: IBook) {
        const {
            title,
            description,
            authors,
            favorite,
            fileCover,
            fileName,
        } = data;
    
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

    async updateBook(id: string, data: IBook) {
        const {
            title,
            description,
            authors,
            favorite,
            fileCover,
            fileName,
        } = data;
    
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
