const express = require('express');
const router = express.Router();
const fileMiddleware = require('../../middleware/files');
const { Book } = require('../../models');
const mockBooks = require('../../store/mock/mockBooks');
const { books } = require('../../store');

router.get('/', (req, res) => {
    res.json(books);
});

router.get('/:id', (req, res) => {
    const { id } = req.params;

    const foundBook = books.find(book => book.id === id);
    if (foundBook) {
        return res.json(foundBook);
    }
    res.status(404);
    res.json('Book not found!');
});

router.post('/', (req, res) => {
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
    store.books.push(book);

    res.status(201);
    res.json(book);
});

router.put('/:id', (req, res) => {
    const { id } = req.params;

    const foundBook = books.find(book => book.id === id);
    if (foundBook) {
        Object.entries(req.body).forEach(([key, value]) => {
            if (Object.prototype.hasOwnProperty.call(foundBook, key)) {
                foundBook[key] = value;
            }
        })
        return res.json(foundBook);
    }
    res.status(404);
    res.json('Book not found!');
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    const bookIndex = books.findIndex(book => book.id === id);
    if (bookIndex !== -1) {
        books.splice(bookIndex, 1);
        return res.json('ok');
    }
    res.status(404);
    res.json('Book not found!');
});

router.post('/upload', fileMiddleware.single('cover-book'), (req, res) => {
    if (req.file) {
        const { path } = req.file;
        res.json(path);
    } else {
        res.json(null);
    }
});

router.get('/:id/download', (req, res) => {
    const { id } = req.params;
    const foundBook = books.find(book => book.id === id);
    if (!foundBook) {
        res.status(404).json();
    }
    const { fileName, fileBook } = foundBook;
    if (fileName && fileBook) {
        res.download(__dirname+`/../public/books/${fileName}`, fileBook, err => {
            if (err){
                res.status(404).json();
            }
        });
    }
});

module.exports = router;