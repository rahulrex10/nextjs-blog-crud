const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./sqlite.db');

// Create table if not exists
db.run(`CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY, title TEXT, content TEXT)`);

const getAllPosts = () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM posts', [], (err, rows) => {
      if (err) reject(err);
      resolve(rows);
    });
  });
};

const createPost = (post) => {
  return new Promise((resolve, reject) => {
    db.run('INSERT INTO posts (title, content) VALUES (?, ?)', [post.title, post.content], function (err) {
      if (err) reject(err);
      resolve(this.lastID);
    });
  });
};

const deletePost = (id) => {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM posts WHERE id = ?', [id], (err) => {
      if (err) reject(err);
      resolve();
    });
  });
};

module.exports = { getAllPosts, createPost, deletePost };
