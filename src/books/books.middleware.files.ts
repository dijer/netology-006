import multer, { FileFilterCallback } from 'multer';
import { Request } from 'express';

const storage = multer.diskStorage({
    destination(req: Request, file: Express.Multer.File, callback: (error: Error | null, filename: string) => void) {
        callback(null, 'public/files')
    },
    filename(req: Request, file: Express.Multer.File, callback: (error: Error | null, filename: string) => void) {
        callback(null, `${new Date().toISOString().replace(/:/g, '-')}-${file.originalname}`)
    }
});

const allowedTypes = ['application/pdf', 'application/epub+zip', 'text/plain'];

const fileFilter = (req: Request, file: Express.Multer.File, callback: FileFilterCallback) => {
    if (allowedTypes.includes(file.mimetype) || 1) {
        callback(null, true)
    } else {
        callback(null, false)
    }
};

export default multer({
    storage, fileFilter
});