import { Schema, model, Document } from 'mongoose';

export interface IBook extends Document {
    title: string;
    description: string;
    authors: string;
    favorite: string;
    fileCover: string;
    fileName: string;
}

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