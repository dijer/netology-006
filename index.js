const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Book } = require('./models');
const mockBooks = require('./mock/mockBooks');

const store = {
    books: mockBooks,
};

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post('/api/user/login', (req, res) => {
    res.status(201);
    res.json({
        id: 1,
        mail: 'test@mail.ru',
    });
});

app.get('/api/books/', (req, res) => {
    const { books } = store;
    res.json(books);
});

app.get('/api/books/:id', (req, res) => {
    const { books } = store;
    const { id } = req.params;

    const foundBook = books.find(book => book.id === id);
    if (foundBook) {
        return res.json(foundBook);
    }
    res.status(404);
    res.json('Book not found!');
});

app.post('/api/books', (req, res) => {
    const { books } = store;
    const {
        title,
        description,
        authors,
        favorite,
        fileCover,
        fileName,
    } = req.body;

    console.log(req.body);
    console.log(req);

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

app.put('/api/books/:id', (req, res) => {
    const { books } = store;
    const { id } = req.params;

    const foundBook = books.find(book => book.id === id);
    if (foundBook) {
        Object.entries(req.body).forEach(([key, value]) => {
            foundBook[key] = value;
        })
        return res.json(foundBook);
    }
    res.status(404);
    res.json('Book not found!');
});

app.delete('/api/books/:id', (req, res) => {
    const { books } = store;
    const { id } = req.params;

    const bookIndex = books.findIndex(book => book.id === id);
    if (bookIndex !== -1) {
        books.splice(bookIndex, 1);
        return res.json('ok');
    }
    res.status(404);
    res.json('Book not found!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});