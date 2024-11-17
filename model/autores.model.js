// autores.model.js
const db = require('./api/dbconfig');

const getAutores = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM autores', (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

const getAutorById = (id) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM autores WHERE id = ?', [id], (err, results) => {
      if (err) reject(err);
      resolve(results[0]);
    });
  });
};

const createAutor = (autor) => {
  return new Promise((resolve, reject) => {
    const { nombre, email, imagen } = autor;
    db.query(
      'INSERT INTO autores (nombre, email, imagen) VALUES (?, ?, ?)',
      [nombre, email, imagen],
      (err, results) => {
        if (err) reject(err);
        resolve(results.insertId);
      }
    );
  });
};

module.exports = { getAutores, getAutorById, createAutor };


