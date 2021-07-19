const conection = require('../database');

// trae todas las respuestas de un comentario
let consultResponse = (req, res) => {
    const {id} = req.params;
    const query = 'CALL spConsultResponseForum(?)';
    conection.query(query, [id], (err, rows, fields) => {
        if (err) {
            console.log(err);
        } else {
            res.json(rows[0]);
        }
    });
};

// crea una respuesta de un comentario
let insertResponse = (req, res) => {
    const {idComment, comment, idUser} = req.body;
    const query = 'CALL spInsertResponseForum(?, ?, ?)';
    conection.query(query, [idComment, comment, idUser], (err, rows, fields) => {
        if (err) {
            console.log(err);
        } else {
            res.json({status: 'Respuesta agregada'});
        }
    });
};

// edita una respuesta de un comentario
let updateResponse = (req, res) => {
    const {id} = req.params;
    const {comment} = req.body;
    const query = 'CALL spUpdateResponseForum(?, ?)';
    conection.query(query, [comment, id], (err, rows, fields) => {
        if (err) {
            console.log(err);
        } else {
            res.json({status: 'Comentario actualizado'});
        }
    });
};

// elimina una respuesta de un comentario
let deleteResponse = (req, res) => {
    const {id} = req.params;
    const query = 'CALL spDeleteResponseForum(?)';
    conection.query(query, [id], (err, rows, fields) => {
        if (err) {
            console.log(err);
        } else {
            res.json({status: 'Comentario eliminado'});
        }
    });
};

// permite que el archivo sea llamado desde otro archivo
module.exports = {
    consultResponse,
    insertResponse,
    updateResponse,
    deleteResponse
};