import express from 'express';
import container from '../../container';
import User from '../../database/mongo/users/users.model';
import authenticate from '../../users/users.middleware.authenticate';
import IUsersService from '../../users/users.service.interface';

const router = express.Router();

const usersService = container.get(IUsersService);

router.get('/login', (req, res) => {
    res.render("users/login", {
        title: "Авторизация",
    });
});

router.post('/login',
    authenticate(),
    (req, res) => {
        res.redirect('/user/me');
});

router.get('/me', (req, res) => {
    if (res.locals.user) {
        const { username } = res.locals.user;
        res.render("users/me", {
            title: "Профиль",
            username,
        });
    }
});

router.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    try {
        await usersService.createUser({
            username,
            password,
        });
        res.redirect('/user/login')
    } catch (e) {

    }
});

router.get('/me', (req, res) => {
    res.render("users/login", {
        title: "Авторизация",
        username: null,
    });
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/user/login');
});

export default router;
