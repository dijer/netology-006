import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
    username: string;
    password: string;
}

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

export default model<IUser>('User', userSchema);