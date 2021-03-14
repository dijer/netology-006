import dotenv from 'dotenv'
import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import User from "../database/mongo/users/users.model";
import { IUser } from '../users/users.interface';

import passport from 'passport';
import { Strategy as LocalStrategy, IStrategyOptions } from 'passport-local';
import expressSession from 'express-session';

import { createServer } from 'http';
import { Server } from 'socket.io';

import errorMiddleware from './middleware/error';
import indexRouter from './routes/index';
import booksApiRouter from '../books/books.routes';
import booksRouter from './routes/books.routes';
import usersRouter from './routes/users.routes';

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server);

/**
 * @param {String} username
 * @param {String} password
 * @param {Function} done
 */
function verify(username: string, password: string, done: Function) {
    User.findOne({ username }, (err: string, user: IUser) => {
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

const options: IStrategyOptions = {
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: false,
};

//  Добавление стратегии для использования
passport.use('local', new LocalStrategy(options, verify));

// passport.serializeUser(function(user: IUser, done: (err: any, id?: string) => void) {
//     done(null, user.id);
// });


passport.deserializeUser(function(id, done) {
    User.findById(id, function(err: string, user: IUser){
        err 
            ? done(err)
            : done(null,user);
        });
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(expressSession({
    secret: process.env.COOKIE_SECRET!,
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
app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

async function start() {
    try {
        const PASSWORD_DB = process.env.PASSWORD_DB;
        const NAME_DB = process.env.NAME_DB;
        const urlDB = `mongodb+srv://app-node:${PASSWORD_DB}@cluster0.syuc2.mongodb.net/${NAME_DB}?retryWrites=true&w=majority`;
        await mongoose.connect(urlDB);
        server.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (e) {
        console.log(e);
    }
}

io.on('connection', socket => {
    const { id } = socket;
    console.log(`Socket connected: ${id}`);

    const { roomName } = socket.handshake.query;
    socket.join(roomName);
    socket.on('message-to-room', (msg: string) => {
        socket.to(roomName).emit('message-to-room', msg);
        socket.emit('message-to-room', msg);
    });

    socket.on('disconnect', () => {
        console.log(`Socket disconnected: ${id}`);
    });
});

start();
