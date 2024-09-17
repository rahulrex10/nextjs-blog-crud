const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./sqlite.db');

// Create table if it doesn't exist
db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY, title TEXT, content TEXT)');
});

// GET all posts
router.get('/', (req, res) => {
  db.all('SELECT * FROM posts', [], (err, rows) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.json(rows);
    }
  });
});

// GET a post by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM posts WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.json(row);
    }
  });
});

// POST a new post
router.post('/', (req, res) => {
  const { title, content } = req.body;
  db.run('INSERT INTO posts (title, content) VALUES (?, ?)', [title, content], function (err) {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.status(201).json({ id: this.lastID, title, content });
    }
  });
});

// DELETE a post
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM posts WHERE id = ?', [id], function (err) {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.status(200).json({ message: 'Post deleted' });
    }
  });
});

module.exports = router;