// backend/routes/banner.js
const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
    db.query('SELECT * FROM banner_settings WHERE id = 1', (err, result) => {
        if (err) throw err;
        res.send(result[0]);
    });
});

router.post('/', (req, res) => {
    const { description, link, timer, isVisible } = req.body;
    db.query('UPDATE banner_settings SET description = ?, link = ?, timer = ?, visible = ? WHERE id = 1',
        [description, link, timer, isVisible],
        (err, result) => {
            if (err) throw err;
            res.send('Banner updated successfully');
        }
    );
});

module.exports = router;
