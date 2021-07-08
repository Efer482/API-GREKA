// importa la conexion con la base de datos
const conection = require('../database');

// funcion que consulta todos los foros
let consultForums = (req, res) => {
    const query = 'CALL spConsultForum';
    conection.query(query, (err, rows, fields) => {
        if(err) {
            console.log(err);
        } else {
            res.json(rows[0]);      
        }
    });
};

// funcion que consulta foros de acuerdo al nombre
let consultForum = (req, res) => {
    const {titleForum} = req.params;
    const query = 'CALL spConsultOnlyForum(?)';
    conection.query(query, [titleForum], (err, rows, fields) => {
        if (err) {
            console.log(err);
        } else {
            res.json(rows[0]);
        }
    });
};

// funcion que crea el foro
let createForum = (req, res) => {
    const {title, description, participant, user} = req.body;
    const query = 'CALL spInsertForum(?, ?, ?, ?)';
    conection.query(query, [title, description, participant, user], (err, rows, fields) => {
        if (err){
            console.log(err);
        } else {
            res.json({status: 'Foro creado'});
        }
    });
};

// funcion que actualiza un foro
let updateForum = (req, res) => {
    const {title, description} = req.body;
    const {id} = req.params;
    const query = 'CALL spUpdateForum(?, ?, ?)';
    conection.query(query, [title, description, id], (err, rows, fields) => {
        if (err) {
            console.log(err);
        } else {
            res.json({status: 'Foro actualizado'});
        }
    });
};

// funcion que elimina un foro
let deleteForum = (req, res) => {
    const {id} = req.params;
    const query = 'CALL spDeleteForum(?)';
    conection.query(query, [id], (err, rows, fields) => {
        if (err){
            console.log(err);
        } else {
            res.json({status: 'Foro eliminado'});
        }
    });
};

// permite que las funciones sean usadas desde un archivo exterior
module.exports = {
    consultForums,
    consultForum,
    createForum,
    updateForum,
    deleteForum
};