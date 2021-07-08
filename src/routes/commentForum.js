const express = require('express');
const router = express.Router();

// importa las funciones que tiene el controlador
const {
    insertComment,
    consultComments,
    updateComment
} = require('../controllers/commentForumController');

// trae todos los comentarios del foro
router.get('/:id', consultComments, (req, res) => {});

// crea un comentario
router.post('/', insertComment, (req, res) => {});

// edita un comentario
router.put('/:id', updateComment, (req, res) => {});

// permite que el archivo sea llamado desde otro archivo
module.exports = router;