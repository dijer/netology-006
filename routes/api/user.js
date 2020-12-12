const express = require('express');
const router = express.Router();
const { user } = require('../../store');

router.post('/login', (req, res) => {
    res.status(201);
    res.json(user);
});

module.exports = router;