import {Request, Response} from 'express';

export default (req: Request, res: Response) => {
    res.render("error/404", {
        title: "404 | страница не найдена",
    });
};
