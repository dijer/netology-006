require('dotenv').config()
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { User } = require('./models');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const expressSession = require('express-session');

const errorMiddleware = require('./middleware/error');
const indexRouter = require('./routes/index');
const booksApiRouter = require('./routes/api/books');
const userApiRouter = require('./routes/api/user');
const booksRouter = require('./routes/books');
const usersRouter = require('./routes/users');

const store = require('./store');

const app = express();

/**
 * @param {String} username
 * @param {String} password
 * @param {Function} done
 */
function verify(username, password, done) {
    User.findOne({ username }, (err,user) => {
        if (err) {
            return done(err);
        }
        if (user) {
            if (password === user.password) {
                return done(null, user);
            }
        }
        return done(null, false);
    });
}

const options = {
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: false,
};

//  Добавление стратегии для использования
passport.use('local', new LocalStrategy(options, verify));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});


passport.deserializeUser(function(id, done) {
    User.findById(id, function(err,user){
        err 
            ? done(err)
            : done(null,user);
        });
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(expressSession({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
}))
app.use(passport.initialize());
app.use(passport.session());

app.use(cors());
app.set('view engine', 'ejs');

app.use('/public', express.static(__dirname + '/public'));

app.use(function(req, res, next){
    res.locals.user = req.user;
    next();
});

app.use('/', indexRouter);
app.use('/books', booksRouter);
app.use('/api/books', booksApiRouter);
app.use('/user', usersRouter);
app.use('/api/user', userApiRouter);
app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

async function start() {
    try {
        const PASSWORD_DB = process.env.PASSWORD_DB;
        const NAME_DB = process.env.NAME_DB;
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

