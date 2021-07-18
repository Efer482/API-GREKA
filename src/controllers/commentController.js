const connection  = require('../database.js');

let insertComment  =   (req, res)    =>{
    const {ID_BOOK, ID_USER, COMMENT, RATING} = req.body;
    const query = `CALL spInsertComments(?, ?, ?, ?)`;
    connection.query(query, [ID_BOOK, ID_USER, COMMENT, RATING], (err, rows, fields) => {
        if(err) throw err
            res.json({Status: 'Comentario agregado'})
    });
}

let spConsultComments   =   (req, res)  =>{
    const { id } = req.params;
    const query = `CALL spConsultComments(?)`;
    connection.query(query, [id], (err, rows, fields) => {
        if(!err){
            console.log(id)
            res.json(rows);
        }else{
            console.log(err);
        }
    })
}

let updateComment   =   (req, res)  =>{
    const {ID, COMMENT} = req.body;
    const query = `CALL spUpdateComment(?, ?)`;
    connection.query(query, [ID, COMMENT], (err, rows, fields) => {
        if(!err){
            res.json({Status: 'Comentario editado'})
        }else{
            console.log(err);
        }
    });
}

let deleteComment   =   (req, res)  =>{
    const   {ID}    =   req.body;
    const   query   =   `CALL spDeleteComment(?)`;
    connection.query(query, [ID],   (err, rows, fields) =>{
        if(!err){
            res.json({Status: 'Comentario borrado'})

        }else{
            console.log(err);
        }
    })
}
module.exports  =   {
    insertComment,
    updateComment,
    spConsultComments,
    deleteComment
}