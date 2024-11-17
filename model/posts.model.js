// posts.model.js
const db = require('./api/dbconfig');

const getPosts = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM posts', (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

const getPostById = (id) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM posts WHERE id = ?', [id], (err, results) => {
      if (err) reject(err);
      resolve(results[0]);
    });
  });
};

const getPostsByAutor = (autorId) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM posts WHERE autor_id = ?', [autorId], (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

const createPost = (post) => {
  return new Promise((resolve, reject) => {
    const { titulo, descripcion, categoria, autor_id } = post;
    db.query(
      'INSERT INTO posts (titulo, descripcion, categoria, autor_id) VALUES (?, ?, ?, ?)',
      [titulo, descripcion, categoria, autor_id],
      (err, results) => {
        if (err) reject(err);
        resolve(results.insertId);
      }
    );
  });
};

module.exports = { getPosts, getPostById, getPostsByAutor, createPost };
