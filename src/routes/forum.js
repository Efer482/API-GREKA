const express = require('express');
const router = express.Router();

// importa las funciones que tiene el controlador
const { consultForums,
        consultForum,
        consultForumUser,
        createForum,
        updateForum,
        deleteForum} = require('../controllers/forumController');

// trae todos los foros
router.get('/', consultForums, (req, res) => {});

// busca un foro por el nombre
router.get('/:titleForum', consultForum, (req, res) => {});

// crea un foro
router.post('/', createForum, (req, res) => {});

// trae los foros de cada usuario
router.get('/user/:id', consultForumUser, (req, res) => {});

// actualiza un foro
router.put('/', updateForum, (req, res) => {});

// elimina un foro
router.delete('/:id', deleteForum, (req, res) => {});

// permite que el archivo sea llamado desde otro archivo
module.exports = router;