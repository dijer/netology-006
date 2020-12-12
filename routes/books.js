const express = require('express');
const router = express.Router();
const { Book } = require('../models');
const { books } = require('../store');

router.get('/', (req, res) => {
    res.render("books/index", {
        title: "Books",
        books,
    });
});

router.get('/create', (req, res) => {
    res.render("books/create", {
        title: "Book | create",
        book: {},
    });
});

router.post('/create', (req, res) => {
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
    books.push(book);

    res.redirect('/books')
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const foundBook = books.find(book => book.id === id);

    if (foundBook) {
        res.render("books/view", {
            title: "Book | view",
            book: foundBook,
        });
    } else {
        res.status(404).redirect('/404');
    }
});

router.get('/update/:id', (req, res) => {
    const { id } = req.params;
    const foundBook = books.find(book => book.id === id);

    if (foundBook) {
        res.render("books/update", {
            title: "Book | view",
            book: foundBook,
        });
    } else {
        res.status(404).redirect('/404');
    }
});

router.post('/update/:id', (req, res) => {
    const { id } = req.params;
    const foundBook = books.find(book => book.id === id);
    if (foundBook) {
        Object.entries(req.body).forEach(([key, value]) => {
            if (Object.prototype.hasOwnProperty.call(foundBook, key)) {
                foundBook[key] = value;
            }
        })
        res.redirect(`/books/${id}`);
    } else {
        res.status(404).redirect('/404');
    }
});

router.post('/delete/:id', (req, res) => {
    const { id } = req.params;
    const bookIndex = books.findIndex(book => book.id === id);

    if (bookIndex !== -1) {
        books.splice(bookIndex, 1);
        res.redirect(`/books`);
    } else {
        res.status(404).redirect('/404');
    }
});

module.exports = router;

