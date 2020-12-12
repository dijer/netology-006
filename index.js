const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

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

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});