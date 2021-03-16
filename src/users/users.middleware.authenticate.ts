import passport from 'passport';
import { Request, Response, NextFunction } from 'express';

export default () =>
    (req: Request, res: Response, next: NextFunction) => {
        passport.authenticate(
            'local',
            {
                failureRedirect: '/user/login',
            },
        )(req, res, next);
    }