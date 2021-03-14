import express from 'express';
import counterMiddleware from '../../books/books.middleware.counter';
import container from '../../container';
import IBooksService from '../../books/books.service.interface';

const router = express.Router();

const booksService = container.get(IBooksService);

router.get('/', async (req, res) => {
    const books = await booksService.getBooks();
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
        const {
            title,
            description,
            authors,
            favorite,
            fileCover,
            fileName,
        } = req.body;
        await booksService.createBook({
            title,
            description,
            authors,
            favorite,
            fileCover,
            fileName,
        });
        res.redirect('/books');
    } catch (e) {
        console.log(e);
    }
});

router.get('/:id', counterMiddleware(), async (req, res) => {
    const { id } = req.params;
    const { counter } = res.locals || 0;
    try {
        const book = await booksService.getBook(id);
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
        const book = await booksService.getBook(id);
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
        const {
            title,
            description,
            authors,
            favorite,
            fileCover,
            fileName,
        } = req.params;
        await booksService.updateBook(id, {
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
        await booksService.deleteBook(id);
        res.redirect(`/books`);
    } catch (e) {
        console.error(e);
        res.status(404).redirect('/404');
    }
});

export default router;
