const conection = require('../database');

// funcion que muestra todos los comentarios del foro
let consultComments = (req, res) => {
    const {idForum} = req.params;
    const query = 'CALL spConsultCommentForum(?)';
    conection.query(query, [idForum], (err, rows, fields) => {
        if (err) {
            console.log(err);
        } else {
            res.json(rows[0]);
        }
    });
};

// funcion que crea un comentario
let insertComment = (req, res) => {
    const {idForum} = req.params;
    const {comment, idUser} = req.body;
    const query = 'CALL spInsertCommentForum(?, ?, ?)';
    conection.query(query, [idForum, comment, idUser], (err, rows, fields) => {
        if (err) {
            console.log(err);
        } else {
            res.json({status: 'Comentario agregado'});
        }
    });
};

// funcion que actualiza un comentario
let updateComment = (req, res) => {
    const {comment} = req.body;
    const {id} = req.params;
    const query = 'CALL spUpdateCommentForum(?, ?)';
    conection.query(query, [comment, id], (err, rows, fields) => {
        if (err) {
            console.log(err);
        } else {
            res.json({status: 'Comentario actualizado'});
        }
    });
};

// funcion que elimina un comentario
let deleteComment = (req, res) => {
    const {comment} = req.params;
    const query = 'CALL spDeleteCommentForum(?)';
    conection.query(query, [comment], (err, rows, fields) => {
        if (err) {
            console.log(err);
        } else {
            res.json({status: 'Comentario eliminado'});
        }
    });
};

// permite que el archivo sea llamado desde otro archivo
module.exports = {
    insertComment,
    consultComments,
    updateComment,
    deleteComment
};