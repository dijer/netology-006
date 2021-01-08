const passport = require('passport');

const authenticate = () =>
    (req, res, next) => {
        passport.authenticate(
            'local',
            {
                failureRedirect: '/user/login',
            },
        )(req, res, next);
    }

module.exports = { authenticate };