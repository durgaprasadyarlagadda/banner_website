const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Your MySQL username
    password: '87654321', // Your MySQL password
    database: 'banner_db'
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database.');

    // Clear the table when the server starts
    db.query('DELETE FROM banner_settings', (err) => {
        if (err) {
            console.error('Error clearing the table:', err);
            return;
        }
    });
});

// API to get the banner data
app.get('/api/banner', (req, res) => {
    db.query('SELECT * FROM banner_settings WHERE id = 1', (err, results) => {
        if (err) {
            console.error('Error fetching banner data:', err);
            return res.status(500).json({ error: err.message });
        }
        res.json(results[0] || {}); // Return empty object if no results
    });
});

// API to update the banner data
app.post('/api/banner', (req, res) => {
    const { description, link, timer, isVisible } = req.body;

    console.log('Received update data:', { description, link, timer, isVisible }); // Debugging

    db.query(
        'SELECT COUNT(*) AS count FROM banner_settings WHERE id = 1',
        (err, results) => {
            if (err) {
                console.error('Error checking row existence:', err);
                return res.status(500).json({ error: err.message });
            }

            if (results[0].count > 0) {
                // Update existing row
                db.query(
                    'UPDATE banner_settings SET description = ?, link = ?, timer = ?, visible = ? WHERE id = 1',
                    [description, link, timer, isVisible],
                    (err) => {
                        if (err) {
                            console.error('Error updating banner data:', err);
                            return res.status(500).json({ error: err.message });
                        }
                        res.send('Banner updated successfully');
                    }
                );
            } else {
                // Insert new row
                db.query(
                    'INSERT INTO banner_settings (id, description, link, timer, visible) VALUES (1, ?, ?, ?, ?)',
                    [description, link, timer, isVisible],
                    (err) => {
                        if (err) {
                            console.error('Error inserting banner data:', err);
                            return res.status(500).json({ error: err.message });
                        }
                        res.send('Banner created successfully');
                    }
                );
            }
        }
    );
});

app.listen(3001, () => {
    console.log('Server running on port 3001');
});
