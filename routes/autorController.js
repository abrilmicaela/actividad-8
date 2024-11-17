module.exports = {
    // Obtener todos los autores
    getAllAutores: (db) => (req, res) => {
      db.query('SELECT * FROM autores', (err, results) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
      });
    },
  
    // Obtener un autor por su ID
    getAutorById: (db) => (req, res) => {
      const { id } = req.params;
      db.query('SELECT * FROM autores WHERE id = ?', [id], (err, results) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
          return res.status(404).json({ message: 'Autor no encontrado' });
        }
        res.status(200).json(results[0]);
      });
    },

    // Obtener todos los posts de un autor
  getPostsByAutor: (db) => (req, res) => {
    const { id } = req.params; 

    
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
  
    // Crear un nuevo autor
    createAutor: (db) => (req, res) => {
      const { nombre, email, imagen } = req.body;
      const query = 'INSERT INTO autores (nombre, email, imagen) VALUES (?, ?, ?)';
      db.query(query, [nombre, email, imagen], (err, results) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.status(201).json({
          message: 'Autor creado exitosamente',
          autor: { id: results.insertId, nombre, email, imagen },
        });
      });
    },
  
    // Actualizar un autor
    updateAutor: (db) => (req, res) => {
      const { id } = req.params;
      const { nombre, email, imagen } = req.body;
      const query = 'UPDATE autores SET nombre = ?, email = ?, imagen = ? WHERE id = ?';
      db.query(query, [nombre, email, imagen, id], (err, results) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
          return res.status(404).json({ message: 'Autor no encontrado' });
        }
        res.status(200).json({ message: 'Autor actualizado exitosamente' });
      });
    },
  
    // Eliminar un autor
    deleteAutor: (db) => (req, res) => {
      const { id } = req.params;
      const query = 'DELETE FROM autores WHERE id = ?';
      db.query(query, [id], (err, results) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
          return res.status(404).json({ message: 'Autor no encontrado' });
        }
        res.status(200).json({ message: 'Autor eliminado exitosamente' });
      });
    },
  };
  