import { Schema, model } from 'mongoose';
import { IBook } from '../../../books/books.interface';

const bookSchema = new Schema({
    title: {
        type: String,
        default: '',
    },
    description: {
        type: String,
        default: 'Описание книги',
    },
    authors: {
        type: String,
        default: '',
    },
    favorite: {
        type: String,
        default: '',
    },
    fileCover: {
        type: String,
        default: '',
    },
    fileName: {
        type: String,
        default: '',
    },
});

export default model<IBook>('Book', bookSchema);