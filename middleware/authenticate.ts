import passport from 'passport';

export default () =>
    (req, res, next) => {
        passport.authenticate(
            'local',
            {
                failureRedirect: '/user/login',
            },
        )(req, res, next);
    }