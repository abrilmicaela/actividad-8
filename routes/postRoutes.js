const express = require('express');
const postController = require('../Controllers/postController');

const router = express.Router();

module.exports = (db) => {
  // Ruta para obtener todos los posts
  router.get('/', postController.getAllPosts(db));

  // Ruta para obtener un post por su ID
  router.get('/:id', postController.getPostById(db));

  // Ruta para crear un nuevo post
  router.post('/', postController.createPost(db));

  // Ruta para actualizar un post
  router.put('/:id', postController.updatePost(db));

  // Ruta para eliminar un post
  router.delete('/:id', postController.deletePost(db));

  return router;
};
