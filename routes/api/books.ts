const express = require('express');
const router = express.Router();
const fileMiddleware = require('../../middleware/files');
import { Book } from '../../models';

router.get('/', async (req, res) => {
    const books = await Book.find().select('-__v');
    res.json(books);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const book = await Book.findById(id);
        return res.json(book);
    } catch (e) {
        console.error(e);
        res.status(404);
        res.json('Book not found!');
    }
});

router.post('/', async (req, res) => {
    const {
        title,
        description,
        authors,
        favorite,
        fileCover,
        fileName,
    } = req.body;

    const book = new Book({
        title,
        description,
        authors,
        favorite,
        fileCover,
        fileName,
    });
    try {
        await book.save();
        res.status(201);
        res.json(book);
    } catch (e) {
        console.log(e);
    }
});

router.put('/:id', async (req, res) => {
    const {
        id,
        title,
        description,
        authors,
        favorite,
        fileCover,
        fileName,
    } = req.params;

    try {
        const foundBook = await Book.findByIdAndUpdate(id, {
            title,
            description,
            authors,
            favorite,
            fileCover,
            fileName,
        });
        return res.json(foundBook);
    } catch (e) {
        res.status(404);
        res.json('Book not found!');
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await Book.deleteOne({ _id: id });
        return res.json('ok');
    } catch (e) {
        res.status(404);
        res.json('Book not found!');
    }
});

router.post('/upload', fileMiddleware.single('cover-book'), (req, res) => {
    if (req.file) {
        const { path } = req.file;
        res.json(path);
    } else {
        res.json(null);
    }
});

// router.get('/:id/download', async (req, res) => {
//     const { id } = req.params;

//     try {
//         const { fileName, fileBook } = await Book.findById(id).select('fileName fileBook');
//         res.download(__dirname+`/../public/books/${fileName}`, fileBook, err => {
//             if (err){
//                 res.status(404).json();
//             }
//         });
//     } catch (e) {
//         res.status(404).json();
//     }
// });

module.exports = router;