const express = require('express');
const counterMiddleware = require('../middleware/counter');
import container from '../contracts/container';
import BookRepository from '../contracts/book.repository';

const router = express.Router();

const repo = container.get(BookRepository);

router.get('/', async (req, res) => {
    const books = await repo.getBooks();
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
    try {
        await repo.createBook(req.body);
        res.redirect('/books');
    } catch (e) {
        console.log(e);
    }
});

router.get('/:id', counterMiddleware(), async (req, res) => {
    const { id } = req.params;
    const { counter } = res.locals || 0;
    try {
        const book = await repo.getBook(id);
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
        const book = await repo.getBook(id);
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
    const { id } = req.params;
    try {
        await repo.updateBook(id, req.params);
        res.redirect(`/books/${id}`);
    } catch (e) {
        console.error(e);
        res.status(404).redirect('/404');
    }
});

router.post('/delete/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await repo.deleteBook(id);
        res.redirect(`/books`);
    } catch (e) {
        console.error(e);
        res.status(404).redirect('/404');
    }
});

module.exports = router;
