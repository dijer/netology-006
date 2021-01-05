const express = require('express');
const counterMiddleware = require('../middleware/counter');
const { Book } = require('../models');

const router = express.Router();

router.get('/', async (req, res) => {
    const books = await Book.find();
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

router.post('/create', async (req, res) => {
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
        res.redirect('/books');
    } catch (e) {
        console.log(e);
    }
});

router.get('/:id', counterMiddleware(), async (req, res) => {
    const { id } = req.params;
    const { counter } = res.locals || 0;
    try {
        const book = await Book.findById(id);
        res.render("books/view", {
            title: "Book | view",
            book,
            counter,
        });
    } catch (e) {
        console.error(e);
        res.status(404).redirect('/404');
    }
});

router.get('/update/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const book = await Book.findById(id);
        res.render("books/update", {
            title: "Book | view",
            book,
        });
    } catch (e) {
        console.error(e);
        res.status(404).redirect('/404');
    }
});

router.post('/update/:id', async (req, res) => {
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
        const book = await Book.findByIdAndUpdate(id, {
            title,
            description,
            authors,
            favorite,
            fileCover,
            fileName,
        });
        res.redirect(`/books/${id}`);
    } catch (e) {
        console.error(e);
        res.status(404).redirect('/404');
    }
});

router.post('/delete/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await Book.deleteOne({ _id: id });
        res.redirect(`/books`);
    } catch (e) {
        console.error(e);
        res.status(404).redirect('/404');
    }
});

module.exports = router;
