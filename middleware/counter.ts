const axios = require('axios');

const COUNTER_URL = process.env.COUNTER_URL || 'http://localhost:3001';

module.exports = () => {
    return async (req, res, next) => {
        const { id } = req.params;
        await axios.post(`${COUNTER_URL}/counter/${id}/incr`);
        const { data: counter } = await axios.get(`${COUNTER_URL}/counter/${id}`);
        res.locals.counter = counter;
        next();
    };
};