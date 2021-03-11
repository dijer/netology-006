import express, { Request, Response } from 'express';
import { User } from '../models';
import authenticate from '../middleware/authenticate';

const router = express.Router();

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

// TODO: Fix this
// router.get('/me', (req: Request, res: Response) => {
//     const { username } = req.user;
//     res.render("users/me", {
//         title: "Профиль",
//         username,
//     });
// });

router.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = new User({
            username,
            password,
        });
        await user.save();
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

module.exports = router;
