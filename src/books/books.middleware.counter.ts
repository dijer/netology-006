import axios from 'axios';
import { Request, Response, NextFunction } from 'express';

const COUNTER_URL = process.env.COUNTER_URL || 'http://localhost:3001';

export default () => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        await axios.post(`${COUNTER_URL}/counter/${id}/incr`);
        const { data: counter } = await axios.get(`${COUNTER_URL}/counter/${id}`);
        res.locals.counter = counter;
        next();
    };
};