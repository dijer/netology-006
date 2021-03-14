import express from 'express';
import fileMiddleware from './books.middleware.files';
import container from '../container';
import IBooksService from './books.service.interface';

const router = express.Router();

const booksService = container.get(IBooksService);

router.get('/', async (req, res) => {
    const books = await booksService.getBooks();
    res.json(books);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const book = await booksService.getBook(id);
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

    try {
        const book = await booksService.createBook({
            title,
            description,
            authors,
            favorite,
            fileCover,
            fileName,
        });
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
        const updatedBook = await booksService.updateBook(id, {
            title,
            description,
            authors,
            favorite,
            fileCover,
            fileName,
        });
        return res.json(updatedBook);
    } catch (e) {
        res.status(404);
        res.json('Book not found!');
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await booksService.deleteBook(id);
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

export default router;