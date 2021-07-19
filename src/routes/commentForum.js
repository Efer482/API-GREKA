const express = require('express');
const router = express.Router();

// importa las funciones que tiene el controlador
const {
    insertComment,
    consultComments,
    nameUser,
    updateComment,
    deleteComment
} = require('../controllers/commentForumController');

// trae el id del foro
router.get('/forum/:idForum', consultComments, (req, res) => {});

// tare el nombre de usuario
router.get('/nameUser/:id', nameUser, (req, res) => {});

// crea un comentario
router.post('/', insertComment, (req, res) => {});

// edita un comentario
router.put('/:id', updateComment, (req, res) => {});

// elimina un comentario
router.delete('/:id', deleteComment, (req, res) => {});

// permite que el archivo sea llamado desde otro archivo
module.exports = router;