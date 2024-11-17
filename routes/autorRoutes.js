const express = require('express');
const autorController = require('../Controllers/autorController');

const router = express.Router();

module.exports = (db) => {
  // Ruta para obtener todos los autores
  router.get('/', autorController.getAllAutores(db));

  // Ruta para obtener un autor por su ID
  router.get('/:id', autorController.getAutorById(db));

  // Ruta para agregar un nuevo autor
  router.post('/', autorController.createAutor(db));

  // Ruta para actualizar un autor
  router.put('/:id', autorController.updateAutor(db));

  // Ruta para eliminar un autor
  router.delete('/:id', autorController.deleteAutor(db));

  return router;
};
