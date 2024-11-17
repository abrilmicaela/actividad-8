module.exports = {
    // Obtener todos los posts
    getAllPosts: (db) => (req, res) => {
      db.query('SELECT * FROM posts', (err, results) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
      });
    },
  
    // Obtener un post por su ID
    getPostById: (db) => (req, res) => {
      const { id } = req.params;
      db.query('SELECT * FROM posts WHERE id = ?', [id], (err, results) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
          return res.status(404).json({ message: 'Post no encontrado' });
        }
        res.status(200).json(results[0]);
      });
    },
  
    // Crear un nuevo post
    createPost: (db) => (req, res) => {
      const { titulo, descripcion, categoria, autor_id } = req.body;
      const query = 'INSERT INTO posts (titulo, descripcion, categoria, autor_id) VALUES (?, ?, ?, ?)';
      db.query(query, [titulo, descripcion, categoria, autor_id], (err, results) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.status(201).json({
          message: 'Post creado exitosamente',
          post: { id: results.insertId, titulo, descripcion, categoria, autor_id },
        });
      });
    },
  
    // Actualizar un post
    updatePost: (db) => (req, res) => {
      const { id } = req.params;
      const { titulo, descripcion, categoria, autor_id } = req.body;
      const query = 'UPDATE posts SET titulo = ?, descripcion = ?, categoria = ?, autor_id = ? WHERE id = ?';
      db.query(query, [titulo, descripcion, categoria, autor_id, id], (err, results) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
          return res.status(404).json({ message: 'Post no encontrado' });
        }
        res.status(200).json({ message: 'Post actualizado exitosamente' });
      });
    },
  
    // Eliminar un post
    deletePost: (db) => (req, res) => {
      const { id } = req.params;
      const query = 'DELETE FROM posts WHERE id = ?';
      db.query(query, [id], (err, results) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
          return res.status(404).json({ message: 'Post no encontrado' });
        }
        res.status(200).json({ message: 'Post eliminado exitosamente' });
      });
    },
  
    // Obtener todos los posts de un autor específico
    getPostsByAutor: (db) => (req, res) => {
      const { id } = req.params;  // Obtenemos el ID del autor de la URL
  
      // Consulta SQL para obtener todos los posts del autor con ese ID
      db.query('SELECT * FROM posts WHERE autor_id = ?', [id], (err, results) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
          return res.status(404).json({ message: 'No se encontraron posts para este autor' });
        }
        res.status(200).json(results);
      });
    },
  };
  