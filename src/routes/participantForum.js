const express = require('express');
const router = express.Router();

// importa las funciones que tiene el controlador
const { insertParticipant,
        deleteParticipant} = require('../controllers/participantController');

// agrega un nuevo participante en el foro
router.post('/', insertParticipant, (req, res) => {});

// elimina un participante del foro
router.delete('/:id', deleteParticipant, (req, res) => {});

// permite que el archivo sea llamado desde otro archivo
module.exports = router;