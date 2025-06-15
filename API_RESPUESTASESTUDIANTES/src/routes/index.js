const express = require('express');
const router = new express.Router();

const index = require('../controllers/index');
const answersRoutes = require('./answers.routes');

// Ruta de prueba
router.get('/', (req, res) =>
  res.json({ message: 'Probando... La prueba de API_RespuestasEstudiantes fue un éxito!' })
);

// Endpoint de ejemplo
router.get('/createTable', index.createTable);

// Rutas CRUD para respuestas
router.use(answersRoutes);

module.exports = router;