require('dotenv').config()
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorMiddleware = require('./middleware/error');
const indexRouter = require('./routes/index');
const booksApiRouter = require('./routes/api/books');
const userApiRouter = require('./routes/api/user');
const booksRouter = require('./routes/books');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
app.set('view engine', 'ejs');

app.use('/public', express.static(__dirname + '/public'));

app.use('/', indexRouter);
app.use('/books', booksRouter);
app.use('/api/books', booksApiRouter);
app.use('/api/user', userApiRouter);
app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

async function start() {
    try {
        const PASSWORD_DB = process.env.PASSWORD_DB;
        const NAME_DB = process.env.NAME_DB;
        console.log(PASSWORD_DB);
        console.log(NAME_DB);
        const urlDB = `mongodb+srv://app-node:${PASSWORD_DB}@cluster0.syuc2.mongodb.net/${NAME_DB}?retryWrites=true&w=majority`;
        await mongoose.connect(urlDB);
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (e) {
        console.log(e);
    }
}

start();

