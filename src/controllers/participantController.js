const conection = require('../database');

// funcion que agrega un usuario a un foro
let insertParticipant = (req, res) => {
    const {idForum, idUser} = req.body;
    const query = 'CALL spInsertParticipantForum(?, ?)';
    conection.query(query, [idForum, idUser], (err, rows, fields) => {
        if (err) {
            console.log(err);
        } else {
            res.json({status: "Participante agregado"});
        }
    });
};

// funcion que elimina a un participante del foro
let deleteParticipant = (req, res) => {
    const {id} = req.params;
    const query = 'CALL spDeleteParticipantForum(?)';
    conection.query(query, [id], (err, rows, fields) => {
        if (err) {
            console.log(err);
        } else {
            res.json({status: 'Participante eliminado'});
        }
    });
};

// permite que las funciones sean llamadas desde otro archivo
module.exports = {insertParticipant, deleteParticipant};