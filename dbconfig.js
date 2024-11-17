// dbconfig.js
const mysql = require('mysql2');
const autorRoutes = require('./routes/autoresRoutes');
const postRoutes = require('./routes/postsRoutes');

const app = express();
const port = 3000;


const connection = mysql.createConnection({
  host: '127.0.0.1',  // 
  user: 'root',       // usuario
  password: 'abril2024', //contraseña
  database: 'blog-api' // nombre base de datos exista
});

connection.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err.stack);
    return;
  }
  console.log('Conectado a la base de datos MySQL');
});

// Rutas
app.use('/api/autores', autorRoutes(db));
app.use('/api/posts', postRoutes(db));

module.exports = connection;
