const express = require('express');
const router = express.Router();

// importa las funciones que tiene el controlador
const {
    insertComment,
    consultComments,
    updateComment,
    deleteComment
} = require('../controllers/commentForumController');

// trae los comentarios del foro
router.get('/:idForum', consultComments, (req, res) => {});

// crea un comentario
router.post('/:idForum', insertComment, (req, res) => {});

// edita un comentario
router.put('/:id', updateComment, (req, res) => {});

// elimina un comentario
router.delete('/:comment', deleteComment, (req, res) => {});

// permite que el archivo sea llamado desde otro archivo
module.exports = router;