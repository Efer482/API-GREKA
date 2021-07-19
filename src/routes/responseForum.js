const express = require('express');
const router = express.Router();

// importa las funciones que tiene el controlador
const {
    consultResponse, 
    insertResponse,
    updateResponse,
    deleteResponse
} = require('../controllers/responseController');

// trae todas las respuestas del comentario
router.get('/:id', consultResponse, (req, res) => {});

// crea una nueva respuesta de un comentario
router.post('/', insertResponse, (req, res) => {});

// actualiza una nueva respuesta de un comentario
router.put('/:id', updateResponse, (req, res) => {});

// elimina una nueva respuesta de un comentario
router.delete('/:id', deleteResponse, (req, res) => {});

// permite que el archivo sea llamado desde otro archivo
module.exports = router;